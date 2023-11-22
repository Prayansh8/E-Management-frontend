import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { useAuth } from "src/hooks/use-auth";
import { useTenantContext } from "src/contexts/tenant-context";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import apiCalls from "src/api";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().max(255).required("Phone or Username is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const LogIn = () => {
  const { setTenantConfig } = useTenantContext();
  const [showPassword, setShowPassword] = useState(false);

  const getThisTenantInfo = async () => {
    const resData = await apiCalls.thisTenant();
    if (resData) {
      setTenantConfig(resData);
    }
  };

  useEffect(() => {
    getThisTenantInfo();
  }, []);

  const { setIncomingAuthData } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (e) => {
      const resData = await apiCalls.login(e);
      if (resData) {
        setIncomingAuthData(resData);
        toast.success("Success");
        const user = resData?.user || {};
        if (user.role === "teacher") {
          window.location.href = "/grades";
        }
        window.location.href = "/";
      } else {
        toast.error("Login Failed");
      }
    },
  });

  return (
    <>
      <Seo title="Login" />
      <div>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant="h5">Log in</Typography>
        </Stack>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              autoFocus
              error={!!(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Phone or Username"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.username}
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{px: 1}} position="end">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
            />
          </Stack>
          <Button
            fullWidth
            sx={{ mt: 3 }}
            size="large"
            type="submit"
            variant="contained"
          >
            Log In
          </Button>
          {/* <Box sx={{ mt: 3 }}>
            <Link href="#" underline="hover" variant="subtitle2">
              Forgot password?
            </Link>
          </Box> */}
        </form>
      </div>
    </>
  );
};

export default LogIn;
