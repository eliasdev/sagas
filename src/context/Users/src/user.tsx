/* eslint-disable import/no-anonymous-default-export */
// import { UsersContextType, UsersProviderProps } from '../Users.type';
import axios from 'axios';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  where,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from './../.././../firebase/firebase';
import emailjs from 'emailjs-com';

export default ({ state, setState, actions }: any) => ({
  getUsers: () => state.users || {},
  setUsers: async () => {
    const users = {};
    // Save users data in state
    setState((state: any) => ({ ...state, users }));
    // Return users
    return users;
  },

  getAuthUser: async () => {
    try {
      const { data } = await axios({
        headers: { 'x-auth-token': state.users.token },
        url: 'http://localhost:4000/api/auth',
        method: 'GET',
      });
      setState((state: any) => ({
        ...state,
        users: { ...state.users, logged: true, user: data.user },
      }));
    } catch {}
  },

  signUp: async (newUser: any, history: any) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      )
        .then(async (userCredential: any) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: newUser.name,
          }).then(async () => {
            await addDoc(collection(db, 'organizations'), {
              name: newUser.organizationName,
              phone: newUser.organizationPhone,
              location: `${newUser.organizationState}, ${newUser.organizationCity}, ${newUser.organizationDistrict}`,
            }).then((orgRef) => {
              updateDoc(doc(db, 'organizations', orgRef.id), {
                id: orgRef.id,
              })
                .then(async () => {
                  const _user = {
                    // gender: "male",
                    name: newUser.name,
                    company: newUser.organizationName,
                    email: newUser.email,
                    lastName: newUser.lastName,
                    phone: newUser.organizationPhone,
                    location: `${newUser.organizationState}, ${newUser.organizationCity}, ${newUser.organizationDistrict}`,
                    avatarUrl:
                      'https://firebasestorage.googleapis.com/v0/b/sagalab-8f9f0.appspot.com/o/avatars%2Fdefault.png?alt=media&token=3b5b8b7a-7b9a-4b0a-8b0a-3a0a0a0a0a0a',
                    status: 'PENDING', // 'PENDING', 'ACTIVE', 'INACTIVE
                    role: 'OWNER', // OWNER, ADMIN, USER
                    username: newUser.name.toLowerCase().replace(' ', '.'),
                  };
                  await addDoc(collection(db, 'users'), _user).then((uRef) => {
                    updateDoc(doc(db, 'users', uRef.id), {
                      id: uRef.id,
                      organization: orgRef.id,
                    })
                      .then(() => {
                        localStorage.setItem('token', uRef.id);
                        setState((state: any) => ({
                          ...state,
                          users: { ...state.users, logged: true, user: _user },
                        }));
                        history.push('/dashboard');

                        const mailData: any = {
                          from_name: 'SAGALAB',
                          from_email: 'grupos@sagalab.info',
                          to_name: 'SAGAS ADMIN',
                          to_email: _user?.email,
                          message: `Nueva cuenta: ${_user?.name} ${_user?.email}`,
                        };

                        emailjs
                          .send(
                            'service_b0mq759',
                            'template_uxr204w',
                            mailData,
                            '7r0MFDYv8obebfCn5'
                          )
                          .then((response) => {
                            console.log('Email sent successfully');
                          })
                          .catch((error) => {
                            console.error('Error sending email:', error);
                            // Handle the error
                          });
                      })
                      .catch((error) => {
                        // The document probably doesn't exist.
                        console.error('Error updating document: ', error);
                      });
                  });
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error);
                });
            });
          });
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });

      // actions.users.getAuthUser();
    } catch (error) {
      alert('error');
    }
  },

  logIn: async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: any) => {
          const user = userCredential.user;

          const dataQuery = query(
            collection(db, 'users'),
            where('role', '==', 'OWNER')
          );
          const dataResponse = await getDocs(dataQuery);
          const results = dataResponse.docs.map((doc: any) => doc.data());
          const _user = results.find((u: any) => u.email === user.email);
          localStorage.setItem('token', user.uid);
          setState((state: any) => ({
            ...state,
            users: { ...state.users, logged: true, user: _user },
          }));
          return true;
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });

      // actions.users.getAuthUser();
    } catch (error) {
      alert('error');
    }
  },

  logInPlayers: async (user: any) => {
    const setLocalUserState = () => {
      localStorage.setItem('token', user.id);
      setState((state: any) => ({
        ...state,
        users: { ...state.users, logged: true, user: user },
      }));
    };
    try {
      if (user.status === 'INACTIVE') {
        updateDoc(doc(db, 'users', user.id), {
          status: 'ACTIVE',
        })
          .then(() => {
            setLocalUserState();
          })
          .catch((error) => {
            // The document probably doesn't exist.
            alert(error);
          });
      } else {
        setLocalUserState();
      }
    } catch (error) {
      alert(error);
    }
  },

  updateUser: async (user: any) =>
    setState((state: any) => ({ ...state, users: { user } })),

  logOut: async () => {
    localStorage.removeItem('token');
    actions.reset();
  },
});
