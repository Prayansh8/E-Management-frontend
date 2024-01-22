import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "@mui/material";
import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";
import Building04Icon from "src/icons/untitled-ui/duocolor/building-04";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";
import { useSchoolContext } from "src/contexts/school-context";
// import { useAuthContext } from "src/contexts/auth-context";

export const useSections = () => {
  const { t } = useTranslation();
  const { gradesSectionsList = [] } = useSchoolContext();
  // const { user } = useAuthContext();

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
            // hidden: !canSeeNavItem(user, navItems.dashboard),
          },
          {
            title: t("Projects"),
            path: paths.projects,
            icon: (
              <SvgIcon fontSize="small">
                <Building04Icon />
              </SvgIcon>
            ),
            // hidden: !canSeeNavItem(user, navItems.projects),
          },
        ],
      },
    ];
  }, [t, gradesSectionsList]);
};
