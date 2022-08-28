/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EventRegistrationData } from './EventData';
import { Attendee } from './Attendee';
import { gray5 } from './Styles';

interface Props {
  data: EventRegistrationData[];
  attendeeFilter?: string;
  renderItem?: (item: EventRegistrationData) => JSX.Element;
}

export const AttendeeList = ({ data, attendeeFilter, renderItem }: Props) => (
  <div>
    <p
      css={css`
        font-size: 20px;
        font-weight: bold;
        padding-top: 15px;
        margin: 10px 0px 5px;
      `}
    >
      Registration List
    </p>

    <ul
      css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0;
      `}
    >
      {data.map((attendee) => (
        <li
          css={css`
            border-top: 1px solid ${gray5};
          `}
          key={attendee.attendeeId}
        >
          {renderItem ? renderItem(attendee) : <Attendee data={attendee} />}
        </li>
      ))}
    </ul>
  </div>
);
