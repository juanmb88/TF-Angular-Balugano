import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const userFeatureKey = 'user';

export interface State {
    users:User[];
}

export const initialState: State = {
     users: [],
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state)=>{
    return{
      ...state,
      users:[{
        id: "asdas",
        name:"Julian",
        accessToken:"asdasdasd",
        email:"email@email.com",
        password:'1234',
        role:"ADMIN"
      },
      {
        id: "asdfef",
        name:"Dario",
        accessToken:"asdasdasd",
        email:"email@email.com",
        password:'1234',
        role:"EMPLOYEE"
      }
    ]
    }
  }),
  on(UserActions.deleteUserById, (state, action) => {
    return {
      // Un nuevo estado en el cual debemos eliminar el usuario con id que recibimos en la accion
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    };
  }),
  on(UserActions.resetState, () => initialState)

);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

