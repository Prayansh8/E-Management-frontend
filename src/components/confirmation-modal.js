import {
  Avatar,
  Box,
  Button,
  Dialog,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const ConfirmationModal = ({
  open,
  onClose,
  icon,
  title,
  descriptions,
  confirmAction,
  confirmText,
  declineAction,
  declineText,
}) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
        <Paper elevation={12}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              p: 3,
            }}
          >
            {!!icon && (
              <Avatar
                sx={{
                  backgroundColor: "error.lightest",
                  color: "error.main",
                }}
              >
                <SvgIcon>{icon}</SvgIcon>
              </Avatar>
            )}
            <div>
              <Typography variant="h5">{title}</Typography>
              {descriptions?.map((description, index) => (
                <Typography
                  key={index}
                  color="text.secondary"
                  sx={{ mt: 1 }}
                  variant="body2"
                >
                  {description}
                </Typography>
              ))}
            </div>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              pb: 3,
              px: 3,
            }}
          >
            {declineText != null &&
            <Button
              sx={{
                backgroundColor: "error.main",
                "&:hover": {
                  backgroundColor: "error.dark",
                },
                mr: 2
              }}
              variant="contained"
              onClick={declineAction ? declineAction : onClose}>
              {declineText}
            </Button>}
            <Button
              sx={{
                backgroundColor: "success.main",
                "&:hover": {
                  backgroundColor: "success.dark",
                },
              }}
              variant="contained"
              onClick={confirmAction}
            >
              {confirmText ? confirmText : "Ok"}
            </Button>
          </Box>
        </Paper>
    </Dialog>
  );
};
