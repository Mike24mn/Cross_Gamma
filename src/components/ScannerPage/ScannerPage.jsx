import React from "react";

import { useHistory } from "react-router-dom";

function ScannerPage() {
    const history = useHistory();

    function submitScan() {
        return;
    }

    // this scanner will pull data from the schwab api/ToS or yahoo
    // finance, since routes are set up for each we should pull whichever
    // one supplies better scan quote results information.

  return (
    <div>
      <h1>
        This will be our scanner component page eventually
      </h1>
      <form className="formPanel" onSubmit={submitScan}>
        <h2>Scan Results:</h2>
        <div>

        </div>
        <div>
          <center>
            <input
              className="btn"
              type="submit"
              name="submit"
              value="Submit Scan"
            />
          </center>
        </div>
      </form>
    </div>
  );
}


export default ScannerPage;
