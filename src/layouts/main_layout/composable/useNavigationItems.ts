interface NavigationItem {
  title: string;
  name: string;
}

interface NavigationGroup {
  icon: string;
  title: string;
  items: Array<NavigationItem>;
}

export async function useNavigationItems() {
  const navigationGroup: Array<NavigationGroup> = [
    {
      title: "layout.navigationItem.jobs.title",
      icon: "mdi-account",
      items: [
        {
          title: "layout.navigationItem.jobs.items.jobList",
          name: "job-list",
        },
      ],
    },
  ];

  return navigationGroup;
}

export { NavigationGroup, NavigationItem };
