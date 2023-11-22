import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "@mui/material";
// import { Chip, SvgIcon } from '@mui/material';

import GraduationHat01Icon from "src/icons/untitled-ui/duocolor/graduation-hat-01";
import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";

import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";
import { useSchoolContext } from "src/contexts/school-context";
import Settings01 from "@untitled-ui/icons-react/build/esm/Settings01";
import { ClassOutlined, CountertopsOutlined, CurrencyRupee } from "@mui/icons-material";
import User01 from "@untitled-ui/icons-react/build/esm/User01";
import { canSeeNavItem, navItems } from "src/utils/permissions";
import { useAuthContext } from "src/contexts/auth-context";

export const useSections = () => {
  const { t } = useTranslation();
  const { gradesSectionsList = [] } = useSchoolContext();
  const { user } = useAuthContext();

  return useMemo(() => {
    return [
      {
        // subheader: t(tokens.nav.concepts),
        items: [
          {
            title: t(tokens.nav.dashboard),
            path: paths.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
            hidden: !canSeeNavItem(user, navItems.dashboard),
          },
          {
            title: t(tokens.nav.classes),
            icon: (
              <SvgIcon fontSize="small">
                <ClassOutlined />
              </SvgIcon>
            ),
            hidden: !canSeeNavItem(user, navItems.classes),
            ...(gradesSectionsList?.length
              ? {
                  items: [
                    {
                      title: "All Classes",
                      path: paths.classes,
                    },
                    {
                      title: "All Sections",
                      path: paths.sections,
                    },
                    ...gradesSectionsList.map((item) => ({
                      title: `${t(`nav.classes.num${item.grade__level}`)} - ${
                        item.title
                      }`,
                      path: paths.viewClassSection(item.id),
                    })),
                  ],
                }
              : { path: paths.classes }),
          },
          {
            title: t("finance"),
            path: paths.finance,
            icon: (
              <SvgIcon fontSize="small">
                <CurrencyRupee />
              </SvgIcon>
            ),
            hidden: !canSeeNavItem(user, navItems.finance),
          },
          {
            title: t("students"),
            path: paths.students,
            icon: (
              <SvgIcon fontSize="small">
                <User01 />
              </SvgIcon>
            ),
            hidden: !canSeeNavItem(user, navItems.students),
          },
          {
            title: t("teachers"),
            path: paths.teachers,
            icon: (
              <SvgIcon fontSize="small">
                <GraduationHat01Icon />
              </SvgIcon>
            ),
            hidden: !canSeeNavItem(user, navItems.teacher),
          },
          {
            title: t("attendance"),
            path: paths.attendance,
            icon: (
              <SvgIcon fontSize="small">
                <CountertopsOutlined />
              </SvgIcon>
            ),
            hidden: !canSeeNavItem(user, navItems.attendance),
          },
          {
            title: "Adminstration",
            path: paths.adminstration,
            icon: (
              <SvgIcon fontSize="small">
                <Settings01 />
              </SvgIcon>
            ),
            hidden: !canSeeNavItem(user, navItems.adminstration),
          },
          // Keep these here for reference
          // {
          //   title: t(tokens.nav.customers),
          //   path: paths.dashboard.customers.index,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <Users03Icon />
          //     </SvgIcon>
          //   ),
          //   items: [
          //     {
          //       title: t(tokens.nav.list),
          //       path: paths.dashboard.customers.index
          //     },
          //   ]
          // },
          // {
          //   path: paths.dashboard.customers.index,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <Users03Icon />
          //     </SvgIcon>
          //   ),
          //   title: t(tokens.nav.list),
          //   label: (
          //     <Chip
          //       color="primary"
          //       label="New"
          //       size="small"
          //     />
          //   )
          // },
        ],
      },
    ];
  }, [t, gradesSectionsList]);
};
