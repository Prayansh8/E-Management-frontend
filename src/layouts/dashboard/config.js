import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "@mui/material";

import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";

import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";
import { useSchoolContext } from "src/contexts/school-context";
import { CurrencyRupee } from "@mui/icons-material";
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
            title: t("projects"),
            path: paths.projects,
            icon: (
              <SvgIcon fontSize="small">
                <CurrencyRupee />
              </SvgIcon>
            ),
            hidden: !canSeeNavItem(user, navItems.projects),
          },
        ],
      },
    ];
  }, [t, gradesSectionsList]);
};
