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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = useSelector((state) => state.user.id);
  const noteItems = useSelector((store) => store.notesReducer);
  const [note, setNote] = useState("");
  const [ticker, setTicker] = useState("")
  const [entryDate, setEntryDate] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if all fields are filled
    if (!note) {
      alert("Please fill in the field before submitting.");
      return;
    }

    dispatch({
      type: "ADD_NOTE",
      payload: { openpos_id: userId, note, ticker, entry_date: entryDate },
    });
    setNote("")
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
            Add new note to the selected position:
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
