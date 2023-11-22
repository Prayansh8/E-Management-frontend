import { useCallback, useEffect, useState } from "react";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import apiCalls from "src/api";
import { paths } from "src/paths";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { FileDropzone } from "src/components/file-dropzone";
import { useSchoolContext } from "src/contexts/school-context";

export const ImportTeachers = (props) => {
  const { onClose, open = false } = props;
  const { setShowGloablLoader } = useSchoolContext();

  const [files, setFiles] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFiles([]);
  }, [open]);

  const handleDrop = useCallback((newFiles) => {
    setFiles((prevFiles) => {
      return [...prevFiles, ...newFiles];
    });
  }, []);

  const handleRemove = useCallback((file) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((_file) => _file.path !== file.path);
    });
  }, []);

  const handleRemoveAll = useCallback(() => {
    setFiles([]);
  }, []);

  const handleUploadAll = async () => {
    try {
      setShowLoading(true);
      setShowGloablLoader(true);
      const formData = new FormData();
      formData.append("teachers_file", files[0]);
      formData.append("role", 'teacher');

      const resData = await apiCalls.uploadUsers(formData);
      if (resData) {
        console.log("Teachers Import Summary", resData);
        toast.success("Teachers Imported Successfully");
        navigate(paths.teachers);
      } else {
        toast.error("Something went wrong!");
      }
    } catch {
      // pass
    }
    setShowLoading(false);
    setShowGloablLoader(false);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">{showLoading ? "Importing ..." : "Import Teachers"}</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <FileDropzone
          accept={{ "text/csv": [] }}
          caption="CSV file should be properly formatted according to the given sample file."
          files={files}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          onUpload={handleUploadAll}
        />
      </DialogContent>
    </Dialog>
  );
};

ImportTeachers.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
