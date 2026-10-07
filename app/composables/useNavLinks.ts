import { computed } from "vue";

export interface NavLink {
  num: string;
  title: string;
  subtitle: string;
  path: string;
}

/**
 * Top-level page routes. Shared by the navigation sidebar and the
 * page transition overlay so both always show the same index/title.
 */
export function useNavLinks() {
  const { t } = useI18n();

  const pageLinks = computed<NavLink[]>(() => [
    {
      num: "01",
      title: t("nav.home"),
      subtitle: "3D interactive vehicle & core highlights",
      path: "/",
    },
    {
      num: "02",
      title: t("nav.projects"),
      subtitle: "Full catalog of software & tools",
      path: "/projects",
    },
    {
      num: "03",
      title: t("nav.blog"),
      subtitle: "Technical write-ups & deep-dives",
      path: "/blog",
    },
    {
      num: "04",
      title: t("nav.about"),
      subtitle: "Experience timeline & skill dossier",
      path: "/about",
    },
  ]);

  /** Resolves the link a path belongs to (e.g. `/blog/some-post` → Blog). */
  function getLinkForPath(path: string): NavLink | undefined {
    const clean = path.replace(/\/+$/, "") || "/";
    if (clean === "/") return pageLinks.value.find((l) => l.path === "/");
    return pageLinks.value
      .filter((l) => l.path !== "/")
      .find((l) => clean === l.path || clean.startsWith(`${l.path}/`));
  }

  return { pageLinks, getLinkForPath };
}

