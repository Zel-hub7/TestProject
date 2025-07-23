/* ───────── ManageBookings.js ───────── */
import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';

import s from './DurationAndAvailability.css';

/* stub list – swap for real systems later */
const reservationSystems = [
  { value: '', label: 'List of online reservation systems…' },
  { value: 'rezdy', label: 'Rezdy' },
  { value: 'peek', label: 'PeekPro' },
  { value: 'fareharbor', label: 'FareHarbor' },
];

/* ------- field render helpers ------------------------------ */
const renderRadio = ({ input, label, ...rest }) => {
  /* checked when group value === this radio’s value */
  const checked = input.value === rest.value;

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
        cursor: 'pointer',
        position: 'relative', // so we can absolutely‑place the tick
        userSelect: 'none',
      }}
    >
      {/* native radio (hidden but accessible) */}
      <input
        {...input}
        {...rest}
        type="radio"
        style={{
          appearance: 'none',
          width: 18,
          height: 18,
          border: '2px solid #1d1d1f',
          borderRadius: 2,
          background: checked ? '#1cb0f6' : 'transparent',
          transition: 'background 0.15s ease, border-color 0.15s ease',
          cursor: 'pointer',
        }}
      />

      {/* white tick overlay when checked */}
      {checked && (
        <svg
          viewBox="0 0 12 12"
          style={{
            position: 'absolute',
            width: 12,
            height: 12,
            left: 4,
            top: 3,
            pointerEvents: 'none',
          }}
        >
          <polyline
            points="1 6 4 9 11 2"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <span style={{ lineHeight: 1 }}>{label}</span>
    </label>
  );
};

const renderSelect = ({ input, options }) => (
  <select
    {...input}
    className={`${s.field} ${s.select}`}
    style={{ marginLeft: 28, marginTop: 12 }}
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

const renderTextarea = ({ input }) => (
  <textarea
    {...input}
    rows={4}
    className={`${s.field} ${s.textarea}`}
    placeholder="e.g., manual process, specific tools, challenges…"
  />
);

/* ------- main component ------------------------------------ */
function ManageBookings({
  handleSubmit,
  previousPage,
  nextPage,
  formPage,
  pristine,
  invalid,
  intl: { formatMessage },
}) {
  const [hasSystem, setHasSystem] = useState('');

  /* only advance when form is valid */
  const goNext = handleSubmit(() => nextPage(parseInt(formPage, 10) + 1));

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={s.experienceCatagoryContainer}
    >
      <div className={s.card}>
        <h2 className={s.title}>MANAGE YOUR BOOKINGS</h2>

        {/* question */}
        <label className={s.question}>
          Do you use an online reservation system?
        </label>

        <div className={s.radioGroup}>
          {/* Yes */}
          <div>
            <Field
              name="hasReservationSystem"
              component={renderRadio}
              label="Yes"
              value="yes"
              onChange={() => setHasSystem('yes')}
            />
            {hasSystem === 'yes' && (
              <Field
                name="reservationSystem"
                component={renderSelect}
                options={reservationSystems}
              />
            )}
          </div>

          {/* No */}
          <Field
            name="hasReservationSystem"
            component={renderRadio}
            label="No"
            value="no"
            onChange={() => setHasSystem('no')}
          />
        </div>

        {/* extra info */}
        <label className={s.question}>
          Provide any additional information about your booking process
        </label>
        <Field name="bookingInfo" component={renderTextarea} />

        <div className={s.buttonRow}>
          <button
            type="button"
            className={s.actionButton}
            onClick={() => nextPage(parseInt(formPage) - 1)}
          >
            Back
          </button>
          <button
            type="button"
            className={s.actionButton}
            onClick={() => previousPage(parseInt(formPage) + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

export default injectIntl(
  withStyles(s)(
    reduxForm({
      form: 'ExperienceManageBookings',
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true,
    })(ManageBookings),
  ),
);
