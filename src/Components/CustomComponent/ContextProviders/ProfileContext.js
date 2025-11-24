import React, {useReducer, useMemo} from 'react';
import PropTypes from 'prop-types';

const initialState = JSON.parse(sessionStorage.getItem('profileState')) || {};

export const ProfileContext = React.createContext();

const updater = (state, update) => {
  const newState = { ...state, ...update };  
  sessionStorage.setItem('profileState', JSON.stringify(newState));  
  return newState;
};

export function ProfileProvider(props) {
  const [profileState, updateProfileState] = useReducer(updater, initialState);
  const value = useMemo(() => [profileState, updateProfileState], [profileState]);

  return (
    <ProfileContext.Provider value={value}>{props.children}</ProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
