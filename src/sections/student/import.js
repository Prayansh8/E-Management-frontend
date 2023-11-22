import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { FileDropzone } from "src/components/file-dropzone";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import { useSchoolContext } from "src/contexts/school-context";
import apiCalls from "src/api";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { paths } from "src/paths";

export const ImportStudents = (props) => {
  const { onClose, open = false } = props;
  const { gradesSectionsList, gradeIndexToLabel, setShowGloablLoader } = useSchoolContext();
  const navigate = useNavigate();

  const [classSection, setClassSection] = useState("");
  const [files, setFiles] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

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
    if (!classSection) {
      toast.error("Please Select Class Section!");
      return;
    }
    try {
      setShowLoading(true);
      setShowGloablLoader(true);
      const formData = new FormData();
      formData.append("new_students_file", files[0]);
      formData.append("grade_section", classSection);
      
      const resData = await apiCalls.uploadStudents(formData);
      if (resData) {
        toast.success("Student Imported Successfully");
        navigate(paths.studentImportSummary(resData.summary_id));
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
        <Typography variant="h6">{showLoading ? "Importing ..." : "Import Students"}</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <Grid
        item
        sx={{
          px: 2,
        }}
      >
        <TextField
          fullWidth
          label="Select Class Section"
          name="grade_section"
          select
          onChange={(e) => setClassSection(e.target.value)}
          value={classSection}
        >
          {gradesSectionsList.map((gradeSection) => (
            <MenuItem
              key={gradeSection.id}
              // selected={}
              value={gradeSection.id}
            >
              {gradeIndexToLabel[gradeSection?.grade__level]}{" "}
              {gradeSection.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
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

ImportStudents.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
