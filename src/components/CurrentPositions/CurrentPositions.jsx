import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

// Current user can either be passed as a prop or saved via state and tracked like that
// i believe, we will mess with the desctructuring and different ways of managing this
// soon

function CurrentPositions() {

  const userId = useSelector((state) => state.user.id)
  const positionsAndStuff = useSelector((store) => store.positionsReducer)

  const dispatch = useDispatch()


  useEffect(() => {
    if (userId) {
      dispatch({ type: "FETCH_POSITIONS", payload: { userId } }) // Fetch positions for the current logged in user
    }
  }, [userId, dispatch])

  // WE WILL NEED TONS OF MATH LOGICS AND MANIPULATIONS TO 
  // GET THE INFORMATION WE WANT ON THE DOM, THIS WILL
  // BE A COMBINATION OF BASIC MATH PERFORMED ON VALUES
  // SAVED ON THE DATABASE AND ONES PULLED FROM THE API
  // IT SHOULD BE NOTED (FOR SELF) THAT IF THE OAuth
  // PROCESS DOES NOT GO AS ANTICIPATED, YOU COULD
  // HARDCODE SOME OF THIS AND STILL GET YOUR
  // POINT ACROSS WITH WHAT THE APP WILL ACTUALLY DO

  


  return (
    <div>
      <p>here is some text for our Current Positions page</p>
      <h1>
        We will eventually use this page as an options table page that analyzes open
        position of a LOGGED IN user
      </h1>
    </div>
  );
}

export default CurrentPositions;