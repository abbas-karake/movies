import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const ModalComp = (props) => {
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

ModalComp.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
}

export default ModalComp;