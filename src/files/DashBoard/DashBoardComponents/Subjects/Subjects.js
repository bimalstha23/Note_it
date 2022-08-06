import React, { useState,useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../../../../Contexts/AuthContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateSubjects } from "../../Classes/Subjects/CreateSubjects";
import {SubjectCard} from "../../Classes/Subjects/SubjectCard";
import {doc, collection, query, onSnapshot} from "firebase/firestore";
import {db} from "../../../../utils/firebaseDB";

export const Subjects = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [Subjects, setSubjects] = useState([]);
  const { currentUser } = useAuth();
  const { data } = props;
  const { name, OwnerEmail, id } = data;
  function handleOpenDialog() {
    setOpenDialog(true);
  }

  useEffect(() => {
    if (currentUser.email) {
      const q = query(collection(db, "CreatedSubject", id, "Subjects"));
      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        setSubjects(
          querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          })
        );
      });
      return () => unSubscribe();
      }
  }, [currentUser.email]);

  console.log(Subjects);
  return (
    <Box>
      <Box display={"flex"} flexDirection={"row"}>
        <Typography paddingRight={2} fontWeight={"Bold"} variant="h5">
          {name}
        </Typography>
        {currentUser.email === OwnerEmail ? (
          <Button
            onClick={handleOpenDialog}
            variant="outlined"
            endIcon={<AddRoundedIcon />}
          >
            Add Subject
          </Button>
        ) : null}
        <CreateSubjects
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          ownerEmail={OwnerEmail}
          classID={data.id}
        />
      </Box>
      <Grid container spacing={2}>
        {Subjects.map((item) => (
            <SubjectCard key = {item.id} subjectData={item} />
        ))}
      </Grid>
    </Box>
  );
};
