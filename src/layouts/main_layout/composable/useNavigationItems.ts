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
      icon: "mdi-file-tree",
      items: [
        {
          title: "layout.navigationItem.jobs.items.jobList",
          name: "job-list",
        },
      ],
    },
    {
      title: "layout.navigationItem.node.title",
      icon: "mdi-desktop-classic",
      items: [
        {
          title: "layout.navigationItem.node.items.nodeList",
          name: "node-list",
        },
      ],
    },
  ];

  return navigationGroup;
}

export { NavigationGroup, NavigationItem };
