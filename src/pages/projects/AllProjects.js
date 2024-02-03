import { useCallback, useEffect, useState } from "react";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "src/components/breadcrumbs-separator";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { ProjectListTable } from "src/sections/allProjects/allProjects-list-table";
import projectsData from "../../data/allProjects.json";

const useProjectsSearch = () => {
  const [state, setState] = useState({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handlePageChange = useCallback((event, page) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

const useProjectsStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    projects: [],
    projectsCount: 0,
  });

  console.log(projectsData);
  const handleProjectsGet = useCallback(async () => {
    try {
      if (isMounted()) {
        setState({
          projects: projectsData,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(() => {
    handleProjectsGet();
  }, [searchState]);

  return {
    ...state,
  };
};

const Page = () => {
  const projectsSearch = useProjectsSearch();
  const projectsStore = useProjectsStore(projectsSearch.state);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Project List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">All Projects</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    // href={paths.dashboard.projects.index}
                    variant="subtitle2"
                  >
                    Projects
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    List
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={RouterLink}
                  // href={paths.dashboard.projects.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  New
                </Button>
              </Stack>
            </Stack>
            <Card>
              <ProjectListTable
                onPageChange={projectsSearch.handlePageChange}
                onRowsPerPageChange={projectsSearch.handleRowsPerPageChange}
                page={projectsSearch.state.page}
                items={projectsStore.projects}
                count={projectsStore.projectsCount}
                rowsPerPage={projectsSearch.state.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
