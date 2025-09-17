import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import bcrypt from 'bcrypt';
import { User, UserProfile } from '../../data/models';
import userLoginType from '../types/userLoginType';
import { decode } from '../../helpers/queryEncryption';
import { setCookies } from '../../helpers/setCookies';

// use your existing verbs list
import usernameVerbs from '../../utils/usernameVerbs';

// ───────── helpers for username generation ─────────
const random3 = () => String(Math.floor(100 + Math.random() * 900)); // 100..999
const pickVerb = () =>
  (usernameVerbs[Math.floor(Math.random() * usernameVerbs.length)] || 'creates')
    .replace(/[^a-z]/g, '');

const slug = (s = '') =>
  String(s).trim().toLowerCase()
    .replace(/\s+/g, '-')          // spaces -> hyphen
    .replace(/[^a-z0-9-]/g, '');   // only url-safe

// firstName-verb123, max 30 chars
function makeCandidate(baseName) {
  const base = slug(baseName) || 'user';
  const verb = pickVerb();
  const num = random3();
  const suffixLen = 1 + verb.length + 3; // '-' + verb + 3 digits
  const maxLen = 30;
  const keep = Math.max(3, maxLen - suffixLen);
  const head = base.length + suffixLen > maxLen ? base.slice(0, keep) : base;
  return `${head}-${verb}${num}`;
}

async function findAvailableUsername(userId, baseName) {
  // try several candidates; bail out fast on first available
  for (let i = 0; i < 10; i++) {
    const candidate = makeCandidate(baseName);
    // eslint-disable-next-line no-await-in-loop
    const taken = await User.count({ where: { username: candidate } });
    if (!taken) return candidate;

    // ultra-rare race: if the *same user* already has it now, just return it
    // (helps if a concurrent login assigned it)
    // eslint-disable-next-line no-await-in-loop
    const self = await User.findOne({ where: { id: userId }, attributes: ['username'], raw: true });
    if (self?.username) return self.username;
  }
  // last-ditch: user-<two random triplets>
  return `${slug(baseName) || 'user'}-${random3()}${random3()}`;
}

// ───────── resolver ─────────
const userLogin = {
  type: userLoginType,
  args: {
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },
  async resolve({ request, response }, { email, password }) {
    try {
      if (!request?.user) {
        const userLogin = await User.findOne({
          attributes: ['id', 'email', 'password', 'userBanStatus', 'userDeletedAt', 'username'],
          where: { email, userDeletedAt: null },
        });

        password = decode(password);

        if (userLogin) {
          if (bcrypt.compareSync(password, userLogin?.password)) {
            if (userLogin.userBanStatus == 1) {
              return { status: 'userbanned' };
            }
            if (userLogin.userDeletedAt != null) {
              return { status: 'userDeleted' };
            }

            // ── AUTO-ASSIGN USERNAME IF MISSING (non-blocking) ──
            if (!userLogin.username) {
              try {
                // prefer firstName from UserProfile; fallback to email local part; else 'user'
                const profile = await UserProfile.findOne({
                  where: { userId: userLogin.id },
                  attributes: ['firstName'],
                  raw: true,
                });
                const base =
                  profile?.firstName ||
                  (userLogin.email ? userLogin.email.split('@')[0] : '') ||
                  'user';

                // find a free candidate and save (retry a couple times on rare collision)
                let assigned = null;
                for (let i = 0; i < 3; i++) {
                  // eslint-disable-next-line no-await-in-loop
                  const candidate = await findAvailableUsername(userLogin.id, base);
                  try {
                    // eslint-disable-next-line no-await-in-loop
                    const [updated] = await User.update(
                      { username: candidate },
                      { where: { id: userLogin.id, username: null } }
                    );
                    if (updated) {
                      assigned = candidate;
                      break;
                    }
                  } catch (e) {
                    // Unique constraint or race — loop again
                  }
                }
                if (assigned) {
                  userLogin.username = assigned; // reflect in-memory (not strictly needed)
                }
              } catch (e) {
                // never block login for this
                // console.error('Username auto-assign failed:', e);
              }
            }

            // normal login flow
            await setCookies({ userLogin, response });
            return { status: 'success' };
          }
          return { status: 'password' };
        }
        return { status: 'email' };
      }

      // already authenticated
      if (request?.user?.admin === true) return { status: 'adminLoggedIn' };
      return { status: 'loggedIn' };
    } catch (_err) {
      // keep prior behavior
      return { status: 'loggedIn' };
    }
  },
};

export default userLogin;
