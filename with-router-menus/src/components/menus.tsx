import * as Menu from "@/components/dropdown-menu";
import { useProject } from "@/data/project";

import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Platform,
  Text,
  View,
  Share,
  useColorScheme,
} from "react-native";
import { MaterialIcons, Ionicons } from "@/components/icons";

const COLORS: { hex: string; name: string }[] = [
  { hex: "#FF3B31", name: "Red" },
  { hex: "#FF9501", name: "Orange" },
  { hex: "#FFCC01", name: "Yellow" },
  { hex: "#34C760", name: "Green" },
  { hex: "#00C7BF", name: "Mint" },
  { hex: "#30B0C8", name: "Teal" },
  { hex: "#32ADE5", name: "Cyan" },
  { hex: "#107AFF", name: "Blue" },
  { hex: "#5956D6", name: "Indigo" },
  { hex: "#AF51DE", name: "Purple" },
  { hex: "#FF2C55", name: "Pink" },
  { hex: "#A2835E", name: "Brown" },
  { hex: "#8E8E93", name: "Gray" },
  { hex: "#111827", name: "Black" },
];

const SPACINGS = [0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

const TYPES = [
  { name: "Large Title", weight: "Regular", size: "34/41" },
  { name: "Title 1", weight: "Regular", size: "28/34" },
  { name: "Title 2", weight: "Regular", size: "22/28" },
  { name: "Title 3", weight: "Regular", size: "20/24" },
  { name: "Headline", weight: "Semi Bold", size: "17/22" },
  { name: "Body", weight: "Regular", size: "17/22" },
  { name: "Callout", weight: "Regular", size: "16/21" },
  { name: "Subhead", weight: "Regular", size: "15/20" },
  { name: "Footnote", weight: "Regular", size: "13/18" },
  { name: "Caption 1", weight: "Regular", size: "12/16" },
  { name: "Caption 2", weight: "Regular", size: "11/13" },
] as const;

export function StylesMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Menu.Trigger
        asChild={Platform.OS !== "web"}
        className="flex flex-1 outline-none items-center justify-center"
      >
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Styles</Menu.Label>
        <Menu.Separator />
        <Menu.Sub key="types-menu">
          <Menu.SubTrigger key="types-trigger">
            <Menu.ItemIcon
              ios={{ name: "textformat" }}
              androidIconName="ic_launcher_round"
            >
              <MaterialIcons name="text" size={16} />
            </Menu.ItemIcon>

            <Menu.ItemTitle>Type</Menu.ItemTitle>
          </Menu.SubTrigger>

          <Menu.SubContent>
            <Menu.Group>
              {TYPES.map((typeItem) => (
                <Menu.Item key={typeItem.name}>
                  <Menu.ItemTitle>{typeItem.name}</Menu.ItemTitle>
                  <Menu.ItemSubtitle>
                    {`${typeItem.size}, ${typeItem.weight}`}
                  </Menu.ItemSubtitle>
                </Menu.Item>
              ))}
            </Menu.Group>
            <Menu.Item key="types-new">
              <Menu.ItemIcon ios={{ name: "plus" }}>
                <Ionicons name="add" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>New Type</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Sub key="spacing-menu">
          <Menu.SubTrigger key="spacing-trigger">
            <Menu.ItemIcon ios={{ name: "arrow.left.and.right" }}>
              <Ionicons name="resize" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Spacing</Menu.ItemTitle>
          </Menu.SubTrigger>

          <Menu.SubContent>
            <Menu.Group>
              {SPACINGS.map((spacing) => (
                <Menu.Item key={String(spacing)}>
                  <Menu.ItemTitle>{String(spacing)}</Menu.ItemTitle>
                </Menu.Item>
              ))}
            </Menu.Group>

            <Menu.Item key="spacing-new">
              <Menu.ItemIcon ios={{ name: "plus" }}>
                <Ionicons name="add" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>New Spacing</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Sub key="gradient-menu">
          <Menu.SubTrigger key="gradient-trigger">
            <Menu.ItemIcon ios={{ name: "circle.lefthalf.fill" }}>
              <MaterialIcons name="gradient-horizontal" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Gradients</Menu.ItemTitle>
          </Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Group>
              <Menu.Item key="top-gradient">
                <Menu.ItemIcon
                  ios={{
                    name: "circle.bottomhalf.fill",
                  }}
                >
                  <MaterialIcons
                    className="transform rotate-180"
                    name="gradient-vertical"
                    size={16}
                  />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Top Gradient</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item key="bottom-gradient">
                <Menu.ItemIcon
                  ios={{
                    name: "circle.tophalf.fill",
                  }}
                >
                  <MaterialIcons name="gradient-vertical" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Bottom Gradient</Menu.ItemTitle>
              </Menu.Item>
            </Menu.Group>

            <Menu.Item key="gradient-new">
              <Menu.ItemIcon ios={{ name: "plus" }}>
                <Ionicons name="add" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>New Gradient</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Sub key="colors-menu">
          <Menu.SubTrigger key="colors-trigger">
            <Menu.ItemIcon ios={{ name: "eyedropper" }}>
              <MaterialIcons name="eyedropper" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Colors</Menu.ItemTitle>
          </Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Group>
              {COLORS.map((color) => (
                <Menu.Item key={color.name}>
                  <Menu.ItemIcon
                    ios={{
                      name: "circle.fill",
                      // Requires iOS 15+
                      hierarchicalColor: color.hex,
                    }}
                  >
                    <MaterialIcons
                      name="checkbox-blank-circle"
                      color={color.hex}
                      size={16}
                    />
                  </Menu.ItemIcon>
                  <Menu.ItemTitle>{color.name}</Menu.ItemTitle>
                  <Menu.ItemSubtitle>{color.hex}</Menu.ItemSubtitle>
                </Menu.Item>
              ))}
            </Menu.Group>

            <Menu.Item key="colors-new">
              <Menu.ItemIcon ios={{ name: "plus" }}>
                <Ionicons name="add" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>New Color</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
      </Menu.Content>
    </Menu.Root>
  );
}

export function MoreMenu({ children }: { children?: React.ReactElement }) {
  const { project, reset, renamePage } = useProject();
  const page = project.pages.find((page) => page.id === project.selectedPage);
  return (
    <Menu.Root>
      <Menu.Trigger className="flex justify-center align-center outline-none">
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Group>
          {/* TODO: Combine the horizontal group with the share button */}
          <Menu.Group horizontal>
            <Menu.Item key="cut" disabled textValue="">
              <Menu.ItemIcon ios={{ name: "scissors" }}>
                <MaterialIcons name="content-cut" size={16} />
              </Menu.ItemIcon>
            </Menu.Item>
            <Menu.Item key="copy" textValue="">
              <Menu.ItemIcon ios={{ name: "doc.on.doc" }}>
                <MaterialIcons name="content-copy" size={16} />
              </Menu.ItemIcon>
            </Menu.Item>
            <Menu.Item key="paste" disabled textValue="">
              <Menu.ItemIcon ios={{ name: "doc.on.clipboard" }}>
                <MaterialIcons name="file-document-multiple" size={16} />
              </Menu.ItemIcon>
            </Menu.Item>
            <Menu.Item key="view" textValue="">
              <Menu.ItemIcon ios={{ name: "eye" }}>
                <MaterialIcons name="eye" size={16} />
              </Menu.ItemIcon>
            </Menu.Item>
          </Menu.Group>
          <Menu.Sub key="project-options">
            <Menu.SubTrigger key="project-trigger">
              <Menu.ItemIcon ios={{ name: "square.and.arrow.up" }}>
                <MaterialIcons name="share" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>Share</Menu.ItemTitle>
            </Menu.SubTrigger>
            <Menu.SubContent>{getShareOptions()}</Menu.SubContent>
          </Menu.Sub>
        </Menu.Group>
        {/*  */}
        <Menu.Group>
          <Menu.Item
            key={"rename-page-top-" + page.id}
            onSelect={async () => {
              const name = await onRename(page.title);
              if (name) {
                renamePage(page.id, name);
              }
            }}
          >
            <Menu.ItemTitle>Rename</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
        {/*  */}
        <Menu.Group>
          <Menu.Sub key="properties">
            <Menu.SubTrigger key="properties-trigger">
              <Menu.ItemTitle>Properties</Menu.ItemTitle>
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item key="copy">
                <Menu.ItemTitle>Copy Page Properties</Menu.ItemTitle>
              </Menu.Item>

              <Menu.Item key="paste" disabled>
                <Menu.ItemTitle>Paste Properties</Menu.ItemTitle>
              </Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>

          <Menu.Sub key="stack">
            <Menu.SubTrigger key="stack-trigger">
              <Menu.ItemTitle>Add to New Stack</Menu.ItemTitle>
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item key="stack">
                <Menu.ItemIcon ios={{ name: "square.2.layers.3d" }}>
                  <MaterialIcons name="layers-outline" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Stack</Menu.ItemTitle>
              </Menu.Item>

              <Menu.Item key="stack-v">
                <Menu.ItemIcon ios={{ name: "arrow.down" }}>
                  <MaterialIcons name="arrow-down" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Stack V</Menu.ItemTitle>
              </Menu.Item>

              <Menu.Item key="stack-h">
                <Menu.ItemIcon ios={{ name: "arrow.right" }}>
                  <MaterialIcons name="arrow-right" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Stack H</Menu.ItemTitle>
              </Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>

          <Menu.Sub key="fill">
            <Menu.SubTrigger key="fill-trigger">
              <Menu.ItemTitle>Auto Fill</Menu.ItemTitle>
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item key="unsplash">
                <Menu.ItemTitle>Unsplash</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item key="assets">
                <Menu.ItemTitle>My Assets</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item key="text">
                <Menu.ItemTitle>Placeholder Text</Menu.ItemTitle>
              </Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>

          <Menu.Item
            key="reset-project"
            destructive
            onSelect={() => {
              reset();
            }}
          >
            <Menu.ItemTitle>Reset Project</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
      {/*  */}
    </Menu.Root>
  );
}

const TOGGLES = [
  { ios: "character", default: "format-letter-matches" },
  { ios: "sun.max", default: "white-balance-sunny" },
  { ios: "moon", default: "moon-waning-crescent" },
] as const;

export function UISettingsMenu({
  children,
}: {
  children?: React.ReactElement;
}) {
  const [toggleIndex, setIndex] = React.useState(0);
  const isDark = useColorScheme() === "dark";

  return (
    <Menu.Root
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Menu.Trigger
        asChild={Platform.OS !== "web"}
        className="flex flex-1 outline-none items-center justify-center"
      >
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>UI Settings</Menu.Label>
        <Menu.Separator />
        <Menu.Group>
          <Menu.Item key="outlines">
            <Menu.ItemIcon ios={{ name: "app.dashed" }}>
              <MaterialIcons name="application-outline" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Outlines</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
        <Menu.Group>
          <Menu.Item key="touches">
            <Menu.ItemIcon ios={{ name: "hand.tap" }}>
              <Ionicons name="add" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Touch Indicator</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>

        <Menu.Group horizontal>
          {TOGGLES.map((toggle, index) => (
            <Menu.Item
              key={toggle.ios}
              textValue={toggle.ios}
              onSelect={() => setIndex(index)}
              shouldDismissMenuOnSelect={false}
            >
              <Menu.ItemIcon
                ios={{
                  name: toggle.ios,
                  hierarchicalColor:
                    index === toggleIndex
                      ? isDark
                        ? "white"
                        : "black"
                      : isDark
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(0,0,0,0.3)",
                }}
              >
                <MaterialIcons name={toggle.default} size={16} />
              </Menu.ItemIcon>
            </Menu.Item>
          ))}
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

export function getShareOptions() {
  return (
    <>
      <Menu.Group>
        <Menu.Item
          key="upgrade"
          onSelect={() => {
            router.push("/modal");
          }}
        >
          <Menu.ItemTitle>Upgrade Plan</Menu.ItemTitle>
          <Menu.ItemSubtitle>
            Get unlimited projects and App Clips
          </Menu.ItemSubtitle>
        </Menu.Item>
      </Menu.Group>

      <Menu.Group>
        <Menu.Item key="share-copy">
          <Menu.ItemIcon ios={{ name: "link.badge.plus" }}>
            <MaterialIcons name="link" size={16} />
          </Menu.ItemIcon>
          <Menu.ItemTitle>Copy Link</Menu.ItemTitle>
          <Menu.ItemSubtitle>Get a URL to the prototype</Menu.ItemSubtitle>
        </Menu.Item>
      </Menu.Group>

      <Menu.Group>
        <Menu.Item
          key="share-more"
          onSelect={() => {
            Share.share({
              message: "Check out my prototype",
              url: "https://expo.dev",
            });
          }}
        >
          <Menu.ItemIcon ios={{ name: "ellipsis" }}>
            <MaterialIcons name="dots-horizontal" size={16} />
          </Menu.ItemIcon>
          <Menu.ItemTitle>More</Menu.ItemTitle>
        </Menu.Item>

        <Menu.Item
          key="app-clip-imessage"
          onSelect={() => {
            // Open the native messenger with some text
            router.push("sms://?body=Check out my prototype https://expo.dev");
          }}
        >
          <Menu.ItemIcon ios={{ name: "message.fill" }}>
            <MaterialIcons name="message" size={16} />
          </Menu.ItemIcon>
          <Menu.ItemTitle>Share Prototype</Menu.ItemTitle>
          <Menu.ItemSubtitle>Send with Messages</Menu.ItemSubtitle>
        </Menu.Item>
      </Menu.Group>
    </>
  );
}

export function ShareMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Menu.Trigger
        asChild={Platform.OS !== "web"}
        className="flex flex-1 outline-none items-center justify-center"
      >
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Share</Menu.Label>
        <Menu.Separator />
        {getShareOptions()}
      </Menu.Content>
    </Menu.Root>
  );
}

async function onRename(defaultValue?: string): Promise<string | null> {
  if (Platform.OS !== "web") {
    return new Promise<string>((resolve) => {
      Alert.prompt(
        "Rename",
        "Enter a new name",
        (newName) => {
          if (newName) {
            resolve(newName);
          } else {
            resolve(null);
          }
        },
        "plain-text",
        defaultValue
      );
    });
  }
  return null;
}

export function PageMenu() {
  const {
    project,
    addPage,
    selectPage,
    setInitialPage,
    renamePage,
    renameProject,
    duplicatePage,
    removePage,
  } = useProject();

  const homeIcon = (
    <Menu.ItemIcon
      ios={{
        name: "house.fill",
        hierarchicalColor: "#34C760",
      }}
    >
      <MaterialIcons name="home" color="#34C760" size={16} />
    </Menu.ItemIcon>
  );
  return (
    <Menu.Root>
      <Menu.Trigger className="outline-none">
        <View className="flex flex-row gap-2 items-center justify-end">
          <MaterialIcons name="arrow-down-thin-circle-outline" size={24} />
          <Text className="font-bold text-black dark:text-white">
            {
              project.pages.find((page) => page.id === project.selectedPage)
                .title
            }
          </Text>
        </View>
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Sub key="project-options">
          <Menu.SubTrigger key="project-trigger">
            <Menu.ItemTitle>{project.title}</Menu.ItemTitle>
          </Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Sub key="project-options">
              <Menu.SubTrigger key="project-trigger">
                <Menu.ItemTitle>Share</Menu.ItemTitle>
              </Menu.SubTrigger>
              <Menu.SubContent>{getShareOptions()}</Menu.SubContent>
            </Menu.Sub>

            <Menu.Item
              key="rename-project"
              onSelect={async () => {
                const name = await onRename(project.title);
                if (name) {
                  renameProject(name);
                }
              }}
            >
              <Menu.ItemTitle>Rename</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Group>
          {project.pages.map((page, index) =>
            page.id === project.selectedPage ? (
              <Menu.Sub key={"page-options-" + index}>
                <Menu.SubTrigger key="page-trigger">
                  {page.id === project.initialPage ? (
                    homeIcon
                  ) : (
                    <Menu.ItemIcon ios={{ name: "ellipsis" }}>
                      <MaterialIcons name="dots-horizontal" size={16} />
                    </Menu.ItemIcon>
                  )}
                  <Menu.ItemTitle>{page.title}</Menu.ItemTitle>
                </Menu.SubTrigger>
                <Menu.SubContent>
                  <Menu.Sub key="page-options">
                    <Menu.SubTrigger key="page-trigger">
                      <Menu.ItemIcon ios={{ name: "square.and.arrow.up" }}>
                        <MaterialIcons name="share" size={16} />
                      </Menu.ItemIcon>
                      <Menu.ItemTitle>Share</Menu.ItemTitle>
                    </Menu.SubTrigger>
                    <Menu.SubContent>{getShareOptions()}</Menu.SubContent>
                  </Menu.Sub>

                  <Menu.Item
                    key="initial"
                    disabled={page.id === project.initialPage}
                    onSelect={() => {
                      setInitialPage(page.id);
                    }}
                  >
                    {homeIcon}
                    <Menu.ItemTitle>Set as Initial Page</Menu.ItemTitle>
                  </Menu.Item>

                  <Menu.Item
                    key={"rename-page-" + page.id}
                    onSelect={async () => {
                      const name = await onRename(page.title);
                      if (name) {
                        renamePage(page.id, name);
                      }
                    }}
                  >
                    <Menu.ItemTitle>Rename</Menu.ItemTitle>
                  </Menu.Item>

                  <Menu.Item
                    key="page-duplicate"
                    onSelect={() => {
                      duplicatePage(page.id);
                    }}
                  >
                    <Menu.ItemTitle>Duplicate</Menu.ItemTitle>
                  </Menu.Item>

                  <Menu.Group>
                    <Menu.Item
                      key="project-delete"
                      disabled={
                        project.pages.length === 1 ||
                        page.id === project.initialPage
                      }
                      destructive
                      onSelect={() => {
                        // TODO: Web requires a custom prompt
                        if (Platform.OS !== "web") {
                          Alert.alert(
                            "Delete Page",
                            `Are you sure you want to delete ${page.title}?`,
                            [
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                              {
                                text: "Delete",
                                style: "destructive",
                                onPress: () => {
                                  removePage(page.id);
                                },
                              },
                            ]
                          );
                        }
                      }}
                    >
                      <Menu.ItemTitle>Delete</Menu.ItemTitle>
                    </Menu.Item>
                  </Menu.Group>
                </Menu.SubContent>
              </Menu.Sub>
            ) : (
              <Menu.Item
                key={"page-" + index}
                shouldDismissMenuOnSelect={false}
                onSelect={() => {
                  selectPage(page.id);
                }}
              >
                {page.id === project.initialPage && homeIcon}
                <Menu.ItemTitle>{page.title}</Menu.ItemTitle>
              </Menu.Item>
            )
          )}

          {/*  */}
          <Menu.Item
            key="page-new"
            shouldDismissMenuOnSelect={false}
            onSelect={() => {
              addPage(`New Page ${project.pages.length + 1}`);
            }}
          >
            <Menu.ItemIcon ios={{ name: "plus" }}>
              <Ionicons name="add" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>New Page</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

export function SortMenu({ children }: { children: React.ReactElement }) {
  const [sort, setSort] = React.useState("alphabetical");

  const SORT_FILTERS = [
    { label: "Alphabetical", value: "alphabetical" },
    { label: "Date Created", value: "date" },
  ];
  const [display, setDisplay] = React.useState("large");

  const DISPLAY_FILTERS = [
    { label: "Large", value: "large" },
    { label: "Compact", value: "compact" },
  ];

  return (
    <Menu.Root>
      <Menu.Trigger className="flex justify-center align-center outline-none">
        {children}
      </Menu.Trigger>

      <Menu.Content>
        {SORT_FILTERS.map(({ value, label }) => (
          <Menu.CheckboxItem
            key={value}
            value={value === sort}
            onValueChange={(next) => next && setSort(value)}
          >
            <Menu.ItemTitle>{label}</Menu.ItemTitle>
          </Menu.CheckboxItem>
        ))}

        <Menu.Group>
          {DISPLAY_FILTERS.map(({ value, label }) => (
            <Menu.CheckboxItem
              key={value}
              value={value === display}
              onValueChange={(next) => next && setDisplay(value)}
            >
              <Menu.ItemTitle>{label}</Menu.ItemTitle>
            </Menu.CheckboxItem>
          ))}
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}
