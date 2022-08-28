/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { gray2, gray3 } from './Styles';

import { EventData } from './EventData';
import { Link } from 'react-router-dom';

interface Props {
  data: EventData;
  showContent?: boolean;
}

export const Event = ({ data, showContent = true }: Props) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    <div
      css={css`
        padding: 10px 0px;
        font-size: 19px;
      `}
    >
      <Link
        css={css`
          text-decoration: none;
          color: ${gray2};
        `}
        to={`/events/${data.eventId}`}
      >
        {data.eventTitle}
      </Link>
    </div>
    {showContent &&
      data.eventDescription !== undefined &&
      data.eventDescription !== null && (
        <div
          css={css`
            padding-bottom: 10px;
            font-size: 15px;
            color: ${gray2};
          `}
        >
          {data.eventDescription !== undefined &&
          data.eventDescription !== null &&
          data.eventDescription.length > 50
            ? `${data.eventDescription.substring(0, 50)}...`
            : data.eventDescription}
        </div>
      )}
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Event coordinator: ${data.coordinatorName}`}
      <br />
      {`Event date: ${data.eventDate.toLocaleDateString()}`}
    </div>
  </div>
);
