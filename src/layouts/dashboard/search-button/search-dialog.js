import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import apiCalls from "src/api";
import { format } from "date-fns";
import { useSchoolContext } from "src/contexts/school-context";
import { paths } from "src/paths";
import { useNavigate } from "react-router";

export const SearchDialog = (props) => {
  const { sectionsById, gradeIndexToLabel } = useSchoolContext();
  const navigate = useNavigate();

  const { onClose, open = false, ...other } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  let debounceTimer = null;

  const localOnClose = () => {
    setResults(null);
    onClose();
  };

  const formatSearchResults = (results) => {
    const formattedResults = {};
    const formattedStudentsResults = results.students?.map((student) => ({
      title: `${student.first_name} ${student.middle_name} ${
        student.last_name
      }${
        sectionsById[student.grade_section]
          ? ` - ${
              gradeIndexToLabel[
                sectionsById[student.grade_section]?.grade__level
              ]
            } ${sectionsById[student.grade_section]?.title}`
          : ""
      }`,
      description: [
        student.enrollment_id,
        student.roll_number,
        format(new Date(student.date_of_birth), "dd MMM yyyy"),
      ].join(" - "),
      path: paths.viewStudent(student.id),
      id: student.id,
    }));
    if (formattedStudentsResults.length) {
      formattedResults.Students = formattedStudentsResults;
    }
    return formattedResults;
  };

  const handleDelayedSearch = useCallback(async (searchQuery) => {
    if (searchQuery) {
      try {
        setIsLoading(true);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          const resData = await apiCalls.searchGlobally({ q: searchQuery });
          setResults(formatSearchResults(resData));
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log("Error occured while searching globally", error);
      }
    }
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={localOnClose}
      open={open}
      {...other}
    >
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
        <Typography variant="h6">Search</Typography>
        <IconButton color="inherit" onClick={localOnClose}>
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <Box component="form">
          <TextField
            fullWidth
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchMdIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={(event) => handleDelayedSearch(event.target.value)}
            placeholder="Start Typing Here..."
          />
        </Box>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {results && (
          <>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {Object.keys(results).length ? (
                Object.keys(results).map((type, index) => (
                  <Stack key={index} spacing={2}>
                    <Typography variant="h6">{type}</Typography>
                    <Stack
                      divider={<Divider />}
                      sx={{
                        borderColor: "divider",
                        borderRadius: 1,
                        borderStyle: "solid",
                        borderWidth: 1,
                      }}
                    >
                      {results[type].map((result, index) => (
                        <Box
                          onClick={() => {
                            localOnClose();
                            navigate(result.path);
                          }}
                          key={result.id}
                          sx={{ p: 2, cursor: "pointer" }}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Typography variant="subtitle1">
                              {result.title}
                            </Typography>
                          </Stack>
                          <Typography
                            color="text.secondary"
                            variant="body2"
                            sx={{ mt: 1 }}
                          >
                            {result.description}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                ))
              ) : (
                <>
                  <Divider />
                  <Typography
                    sx={{
                      p: 2,
                    }}
                    align="center"
                  >
                    No Results Found
                  </Typography>
                </>
              )}
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

SearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
