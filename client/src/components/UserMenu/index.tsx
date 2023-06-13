import React, { FC, useState, useRef, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

import user from '@assets/user.jpg';
import { ModalContainer } from '@components/ModalContainer';
import { useAuth, useAppDispatch } from '@hooks';
import { logout } from '@store/auth/operations';

import './UserMenu.scss';

export const UserMenu: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openMenuHandler = () => setMenuOpen(true);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  const openModalHandler = () => setModalOpen(true);

  const closeModalHandler = () => setModalOpen(false);

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="menu">
      <div className="menu__thumb" onClick={openMenuHandler}>
        <img src={user} alt="User" className="menu__image" />
      </div>
      <p className="menu__name">{auth.user?.username}</p>
      {menuOpen && (
        <div className="menu__wrapper" ref={menuRef}>
          <button
            type="button"
            className="menu__button"
            onClick={openModalHandler}
          >
            Log out
          </button>
        </div>
      )}
      {modalOpen && (
        <ModalContainer closeModal={closeModalHandler}>
          <button
            type="button"
            className="menu__modal-close"
            onClick={closeModalHandler}
          >
            <RxCross2 size={24} />
          </button>
          <div className="menu__modal-wrapper">
            <p className="menu__modal-question">
              Are you sure you want to logout?
            </p>
            <div className="menu__button-wrapper">
              <button
                type="button"
                className="menu__button menu__button_primary"
                onClick={logoutHandler}
              >
                Log out
              </button>
              <button
                type="button"
                className="menu__button menu__button_secondary"
                onClick={closeModalHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
};
