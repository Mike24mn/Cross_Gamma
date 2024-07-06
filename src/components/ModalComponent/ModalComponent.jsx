import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  

  const userId = useSelector((state) => state.user.id);
  const noteItems = useSelector((store) => store.notesReducer);
  const [note, setNote] = useState("");
  const [ticker, setTicker] = useState("")
  const [entryDate, setEntryDate] = useState("")

 

  
  const dispatch = useDispatch()

  const pickCell = (event) => {
    const parentCol = event.target.closest('tr')
    if (parentCol) {
        const individualCells = parentCol.cells
        const tickerTarget = individualCells[0].textContent // this is the first column of our table
        const entryDateTarget = individualCells[7].textContent // this is the 8th column of our table (index 7)
        setTicker(tickerTarget)
        setEntryDate(entryDateTarget)
    }
    else {
        console.log("NO cell found");
    }
  }

  // this handleOpen will make it so when we go to open the modal, pickCell function gets
  // called and selects ticker and entry date, since issues were being encountered
  // with ticker and entry date coming back an empty string or undefined (depending on how I was testing the code)
  // also set the modal boolean setOpen to true on click

  const handleOpen = (event) => {
    pickCell(event)
    setOpen(true)
  }

  const handleClose = () => setOpen(false);


  const handleSubmit = (event) => {
    event.preventDefault();

    // check if field is filled
    if (!note) {
      alert("Please fill in the field before submitting.");
      return;
    }

    dispatch({
      type: "ADD_NOTE",
      payload: {  note, ticker, entry_date: entryDate, user_id: userId, },
    });
    setNote("")
    handleClose(); // close window
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Note
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
         <center> Add new note to the selected position <b>${ticker}</b>:</center>
          </Typography>
          <center>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <input
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add Note"
              ></input>
              <button onClick={handleSubmit}>Submit</button>
            </Typography>
          </center>
        </Box>
      </Modal>
    </div>
  );
}
