import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
  return (
    <div>
      <Dialog
        open={props.show}
        onClose={props.onClose}
        maxWidth="md"
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {(props.title) && <DialogTitle>{props.title}</DialogTitle>}
        <DialogContent>
            {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
