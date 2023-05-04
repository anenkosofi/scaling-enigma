import PropTypes from 'prop-types';

import './Button.scss';

export const Button = ({
  selected = false,
  type = 'button',
  children,
  ...otherProps
}) => {
  return (
    <button
      type={type}
      className={
        selected ? 'filter-button filter-button--selected' : 'filter-button'
      }
      {...otherProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  selected: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};
