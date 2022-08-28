/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';
import { UserIcon } from './Icons';
import { useForm } from 'react-hook-form';
import { useAuth } from './Auth';

import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
const buttonStyle = css`
  font-family: ${fontFamily};
  font-size: ${fontSize};
  padding: 5px 10px;
  background-color: transparent;
  color: ${gray2};
  text-decoration: none;
  cursor: pointer;
  :focus {
    outline-color: ${gray5};
  }
  span {
    margin-left: 7px;
  }
`;
type FormData = {
  search: string;
};
export const Header = () => {
  const navigate = useNavigate();
  const loco = useLocation();
  const { register, handleSubmit } = useForm<FormData>();
  const [searchParams] = useSearchParams();
  const criteria = searchParams.get('criteria') || '';

  const submitForm = ({ search }: FormData) => {
    navigate(`search?criteria=${search}`);
  };
  const { isAuthenticated, user, loading } = useAuth();
  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        Event Planner
        <span
          css={css`
            margin-left: 5px;
            font-size: 14px;
            font-weight: normal;
          `}
        ></span>
      </Link>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          {...register('search')}
          type="text"
          placeholder="Event search..."
          defaultValue={criteria}
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 3px;
            color: ${gray2};
            background-color: white;
            width: 200px;
            height: 30px;
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
      </form>

      <div>
        {!loading &&
          (isAuthenticated ? (
            <div>
              <span>{user!.name}</span>

              <Link to="/signout" css={buttonStyle}>
                <UserIcon />
                <span>Sign Out</span>
              </Link>
            </div>
          ) : (
            <Link
              to="signin"
              css={css`
                font-family: ${fontFamily};
                font-size: ${fontSize};
                padding: 5px 10px;
                background-color: transparent;
                color: ${gray2};
                text-decoration: none;
                cursor: pointer;
                :focus {
                  outline-color: ${gray5};
                }
                span {
                  margin-left: 7px;
                }
              `}
            >
              <span
                css={css`
                  margin-left: 7px;
                `}
              >
                <UserIcon />
                Sign In
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};
