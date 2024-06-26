import React from 'react';



function AccountOverview() {

    

    return (
        <div>
          <LoginForm />
    
          <center>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/registration');
              }}
            >
              Register
            </button>
          </center>
        </div>
      );

    }

export default AccountOverview;