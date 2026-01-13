import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../Stores/UserProfileSlice';
import LoadingBox from '../Loading/LoadingBox';
import MessageBox from '../Loading/MessageBox';
import { reset_profile_success } from '../../Stores/AuthSlice';

const UserProfile = () => {
  const dispatch = useDispatch();

  const { userInfo,profileUpdateSuccess } = useSelector(state => state.auth);
  const { profileDetails, loading, error } = useSelector(
    state => state.profileDetails
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [formError, setFormError] = useState(null);

  // 1️⃣ Fetch profile
  useEffect(() => {
    if (userInfo?._id) {
      dispatch(getUserProfile(userInfo._id));
    }
  }, [dispatch, userInfo]);

  // 2️⃣ Populate form AFTER data arrives
  useEffect(() => {
    if (profileDetails) {
      setName(profileDetails.name || '');
      setEmail(profileDetails.email || '');
    }
    if(profileUpdateSuccess){
      setTimeout(() => {
        dispatch(reset_profile_success())
      }, 3000);
    }
  }, [profileDetails,profileUpdateSuccess]);

  const updateHandler = (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setFormError('Password and Confirm Password must match!');
      return;
    }

    setFormError(null);
dispatch(updateUserProfile({name,email,password}))
    // dispatch(updateUserProfile({ name, email, password }));
  };

  return (
    <div>
      <form className='form' onSubmit={updateHandler}>
        <h1>User Profile</h1>

        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
{profileUpdateSuccess && <MessageBox variant='success'>Profile Updated Successfully </MessageBox>}
        {!loading && !error && (
          <>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>

            {formError && (
              <MessageBox variant="danger">{formError}</MessageBox>
            )}

            <button className="primary block">Update Profile</button>
          </>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
