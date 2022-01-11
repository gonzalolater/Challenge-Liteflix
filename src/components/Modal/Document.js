import { Button, Grid, Paper } from "@material-ui/core";
import { CloudUpload, Delete } from "@material-ui/icons";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import { parseFiletype } from "../../common/documents/FileIcon";
import FileInput, { onClick as onFileClick } from "../../common/documents/FileInput";
import { validateFile } from "../../common/documents/hooks";
import Viewer from "../../common/viewer/Viewer";

const handleEvent = fn => event => {
  try {
    event.preventDefault();
    event.stopPropagation();
  } catch (_e) {
    /* ignored */
  }
  if (typeof fn === "function") fn(event);
};

const newState = (state, payload) => {
  if (state.blob?.url) URL.revokeObjectURL(state.blob.url);
  const blob = payload
    ? { filename: payload.name, url: URL.createObjectURL(payload), type: payload.type, ...parseFiletype(payload.type) }
    : undefined;
  return { ...state, file: payload, blob };
};

const WcAddDocument = memo(({ blob, file, setState }) => {
  const [{ hover, errorDrag }, setStatus] = useState({ hover: false, errorDrag: false });
  const onUploadChange = handleEvent(({ target: { files } }) => {
    if ([...files].map(f => ({ type: f.type, kind: "file" })).some(i => !validateFile(i))) return toast.error("Invalid files");
    return setState(ps => newState(ps, files[0]), false);
  });
  const onDeleteFile = () => setState(ps => newState(ps), false);
  const onDragOver = handleEvent(({ dataTransfer: { items } }) => setStatus(ps => ({ ...ps, hover: true, errorDrag: !validateFile(items[0]) })));
  const onDragLeave = () => setStatus(ps => ({ ...ps, hover: false, errorDrag: false }));
  const onDrop = handleEvent(({ dataTransfer: { files } }) => {
    onDragLeave();
    return onUploadChange({ target: { files } });
  });
  return (
    <Grid item xs={4} className={clsx({ "tc-upload-wc": !file })}>
      {blob && (
        <Viewer
          hideDownload
          {...{
            blob,
            actions: [
              { key: "btn-upload", icon: <CloudUpload />, onClick: onFileClick, tooltip: "Upload File" },
              { key: "btn-delete", icon: <Delete />, onClick: onDeleteFile, tooltip: "Delete File" }
            ]
          }}
        />
      )}
      {!file && (
        <div {...{ onDragOver, onDragLeave, onDrop }} className="tc-upd-dropzone tc-mb0 tc-full-width">
          <Paper className={clsx({ "tc-upd-hover": hover, "tc-upd-error": errorDrag })}>
            <CloudUpload />
            <div>Please upload your file</div>
            <Button color="primary" variant="contained" onClick={onFileClick}>
              Select File
            </Button>
          </Paper>
        </div>
      )}
      <FileInput multiple={false} onChange={onUploadChange} />
    </Grid>
  );
});

WcAddDocument.propTypes = { blob: PropTypes.objectOf(PropTypes.any), file: PropTypes.objectOf(PropTypes.any), setState: PropTypes.func.isRequired };
WcAddDocument.defaultProps = { blob: undefined, file: undefined };

export default WcAddDocument;
