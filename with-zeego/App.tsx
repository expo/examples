import "@expo/metro-runtime";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import * as Menu from "zeego/dropdown-menu";

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

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, padding: 16 }}></View>
      <Footer />
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View
      style={{
        alignItems: "center",
        height: 48,
        borderBottomColor: "rgba(0,0,0,0.3)",
        borderBottomWidth: 0.5,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 16,
      }}
    >
      <SortMenu>
        <Ionicons name="options" color="black" size={24} />
      </SortMenu>

      <PageMenu
        projectName="My New Draft"
        pages={[
          {
            title: "Page 1",
            isInitial: true,
            isSelected: false,
          },
          {
            title: "Page 2",
            isInitial: false,
            isSelected: true,
          },
        ]}
      />

      <MoreMenu>
        <Ionicons name="menu-outline" color="black" size={24} />
      </MoreMenu>
    </View>
  );
}

function Footer() {
  return (
    <View
      style={{
        alignItems: "center",
        height: 48,
        borderTopColor: "rgba(0,0,0,0.3)",
        borderTopWidth: 0.5,
        justifyContent: "space-around",
        flexDirection: "row",
      }}
    >
      <StylesMenu>
        <Ionicons name="options" color="black" size={24} />
      </StylesMenu>

      <UISettingsMenu>
        <Ionicons name="settings-outline" color="black" size={24} />
      </UISettingsMenu>

      <ShareMenu>
        <Ionicons name="share-outline" color="black" size={24} />
      </ShareMenu>
    </View>
  );
}

function SortMenu({ children }: { children: React.ReactElement }) {
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
      <Menu.Trigger>{children}</Menu.Trigger>

      <Menu.Content>
        {SORT_FILTERS.map(({ value, label }) => (
          <Menu.CheckboxItem
            key={value}
            value={value === sort}
            onValueChange={(next) => next && setSort(value)}
          >
            <Menu.ItemIndicator>
              <Ionicons name="checkmark" color="black" size={16} />
            </Menu.ItemIndicator>

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
              <Menu.ItemIndicator>
                <Ionicons name="checkmark" color="black" size={16} />
              </Menu.ItemIndicator>

              <Menu.ItemTitle>{label}</Menu.ItemTitle>
            </Menu.CheckboxItem>
          ))}
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

function StylesMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger>{children}</Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Styles</Menu.Label>

        <Menu.Sub key="types-menu">
          <Menu.SubTrigger key="types-trigger">
            <Menu.ItemTitle>Type</Menu.ItemTitle>
            <Menu.ItemIcon ios={{ name: "textformat" }} />
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
              <Menu.ItemTitle>New Type</Menu.ItemTitle>
              <Menu.ItemIcon ios={{ name: "plus" }} />
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Sub key="spacing-menu">
          <Menu.SubTrigger key="spacing-trigger">
            <Menu.ItemTitle>Spacing</Menu.ItemTitle>
            <Menu.ItemIcon ios={{ name: "arrow.left.and.right" }} />
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
              <Menu.ItemTitle>New Spacing</Menu.ItemTitle>
              <Menu.ItemIcon ios={{ name: "plus" }} />
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Sub key="gradient-menu">
          <Menu.SubTrigger key="gradient-trigger">
            <Menu.ItemTitle>Gradients</Menu.ItemTitle>
            <Menu.ItemIcon ios={{ name: "circle.lefthalf.fill" }} />
          </Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Group>
              <Menu.Item key="top-gradient">
                <Menu.ItemTitle>Top Gradient</Menu.ItemTitle>
                <Menu.ItemIcon
                  ios={{
                    name: "circle.bottomhalf.fill",
                  }}
                />
              </Menu.Item>
              <Menu.Item key="bottom-gradient">
                <Menu.ItemTitle>Bottom Gradient</Menu.ItemTitle>
                <Menu.ItemIcon
                  ios={{
                    name: "circle.tophalf.fill",
                  }}
                />
              </Menu.Item>
            </Menu.Group>

            <Menu.Item key="gradient-new">
              <Menu.ItemTitle>New Gradient</Menu.ItemTitle>
              <Menu.ItemIcon ios={{ name: "plus" }} />
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Sub key="colors-menu">
          <Menu.SubTrigger key="colors-trigger">
            <Menu.ItemTitle>Colors</Menu.ItemTitle>
            <Menu.ItemIcon ios={{ name: "eyedropper" }} />
          </Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Group>
              {COLORS.map((color) => (
                <Menu.Item key={color.name}>
                  <Menu.ItemTitle>{color.name}</Menu.ItemTitle>
                  <Menu.ItemSubtitle>{color.hex}</Menu.ItemSubtitle>

                  <Menu.ItemIcon
                    ios={{
                      name: "circle.fill",
                      // Requires iOS 15+
                      hierarchicalColor: color.hex,
                    }}
                  />
                </Menu.Item>
              ))}
            </Menu.Group>

            <Menu.Item key="colors-new">
              <Menu.ItemTitle>New Color</Menu.ItemTitle>
              <Menu.ItemIcon ios={{ name: "plus" }} />
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
      </Menu.Content>
    </Menu.Root>
  );
}

function MoreMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger>{children}</Menu.Trigger>

      <Menu.Content>
        <Menu.Group>
          {/* TODO: Combine the horizontal group with the share button */}
          <Menu.Group horizontal>
            <Menu.Item key="cut" disabled textValue="">
              <Menu.ItemIcon ios={{ name: "scissors" }} />
            </Menu.Item>
            <Menu.Item key="copy" textValue="">
              <Menu.ItemIcon ios={{ name: "doc.on.doc" }} />
            </Menu.Item>
            <Menu.Item key="paste" disabled textValue="">
              <Menu.ItemIcon ios={{ name: "doc.on.clipboard" }} />
            </Menu.Item>
            <Menu.Item key="view" textValue="">
              <Menu.ItemIcon ios={{ name: "eye" }} />
            </Menu.Item>
          </Menu.Group>
          <Menu.Sub key="project-options">
            <Menu.SubTrigger key="project-trigger">
              <Menu.ItemTitle>Share</Menu.ItemTitle>
              <Menu.ItemIcon ios={{ name: "square.and.arrow.up" }} />
            </Menu.SubTrigger>
            <Menu.SubContent>{getShareOptions()}</Menu.SubContent>
          </Menu.Sub>
        </Menu.Group>
        {/*  */}
        <Menu.Group>
          <Menu.Item
            key="rename"
            onSelect={() => {
              Alert.prompt("Rename", "Enter a new name", (newName) => {
                if (newName) {
                  Alert.alert("Renamed", `Renamed to ${newName}`);
                }
              });
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
                <Menu.ItemTitle>Stack</Menu.ItemTitle>
                <Menu.ItemIcon ios={{ name: "square.2.layers.3d" }} />
              </Menu.Item>

              <Menu.Item key="stack-v">
                <Menu.ItemTitle>Stack V</Menu.ItemTitle>
                <Menu.ItemIcon ios={{ name: "arrow.down" }} />
              </Menu.Item>

              <Menu.Item key="stack-h">
                <Menu.ItemTitle>Stack H</Menu.ItemTitle>
                <Menu.ItemIcon ios={{ name: "arrow.right" }} />
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
        </Menu.Group>
      </Menu.Content>
      {/*  */}
    </Menu.Root>
  );
}

function UISettingsMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger>{children}</Menu.Trigger>

      <Menu.Content>
        <Menu.Label>UI Settings</Menu.Label>

        <Menu.Group>
          <Menu.Item key="outlines">
            <Menu.ItemTitle>Outlines</Menu.ItemTitle>
            <Menu.ItemIcon ios={{ name: "app.dashed" }} />
          </Menu.Item>
        </Menu.Group>
        <Menu.Group>
          <Menu.Item key="touches">
            <Menu.ItemTitle>Touch Indicator</Menu.ItemTitle>
            <Menu.ItemIcon ios={{ name: "hand.tap" }} />
          </Menu.Item>
        </Menu.Group>

        <Menu.Group horizontal>
          <Menu.Item key="character" textValue="">
            <Menu.ItemIcon ios={{ name: "character" }} />
          </Menu.Item>
          <Menu.Item key="appearance" textValue="">
            <Menu.ItemIcon ios={{ name: "sun.max" }} />
          </Menu.Item>
          <Menu.Item key="paste" textValue="">
            <Menu.ItemIcon ios={{ name: "moon" }} />
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

function getShareOptions() {
  return (
    <>
      <Menu.Group>
        <Menu.Item key="upgrade">
          <Menu.ItemTitle>Upgrade Plan</Menu.ItemTitle>
          <Menu.ItemSubtitle>
            Get unlimited projects and App Clips
          </Menu.ItemSubtitle>
        </Menu.Item>
      </Menu.Group>

      <Menu.Group>
        <Menu.Item key="editor">
          <Menu.ItemTitle>Editor Link</Menu.ItemTitle>
          <Menu.ItemSubtitle>Copy link to Editor</Menu.ItemSubtitle>
          <Menu.ItemIcon ios={{ name: "person.2.fill" }} />
        </Menu.Item>
      </Menu.Group>

      <Menu.Group>
        <Menu.Item key="more">
          <Menu.ItemTitle>More</Menu.ItemTitle>
          <Menu.ItemIcon ios={{ name: "ellipsis" }} />
        </Menu.Item>

        <Menu.Item key="app-clip-imessage">
          <Menu.ItemTitle>Share Prototype with App Clip</Menu.ItemTitle>
          <Menu.ItemSubtitle>Send with Messages</Menu.ItemSubtitle>
          <Menu.ItemIcon ios={{ name: "message.fill" }} />
        </Menu.Item>

        <Menu.Item key="app-clip">
          <Menu.ItemTitle>Share Prototype with App Clip</Menu.ItemTitle>
          <Menu.ItemSubtitle>Copy Link</Menu.ItemSubtitle>
          <Menu.ItemIcon ios={{ name: "apple.logo" }} />
        </Menu.Item>
      </Menu.Group>
    </>
  );
}

function ShareMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger>{children}</Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Share</Menu.Label>

        {getShareOptions()}
      </Menu.Content>
    </Menu.Root>
  );
}

function PageMenu({
  projectName,
  pages,
}: {
  projectName: string;
  pages: { title: string; isInitial: boolean; isSelected: boolean }[];
}) {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Ionicons name="arrow-down-circle-outline" color="black" size={24} />
          <Text style={{ fontWeight: "bold" }}>
            {pages.find((page) => page.isSelected).title}
          </Text>
        </View>
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Sub key="project-options">
          <Menu.SubTrigger key="project-trigger">
            <Menu.ItemTitle>{projectName}</Menu.ItemTitle>
          </Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Sub key="project-options">
              <Menu.SubTrigger key="project-trigger">
                <Menu.ItemTitle>Share</Menu.ItemTitle>
              </Menu.SubTrigger>
              <Menu.SubContent>{getShareOptions()}</Menu.SubContent>
            </Menu.Sub>

            <Menu.Item
              key="rename"
              onSelect={() => {
                Alert.prompt("Rename", "Enter a new name", (newName) => {
                  if (newName) {
                    Alert.alert("Renamed", `Renamed to ${newName}`);
                  }
                });
              }}
            >
              <Menu.ItemTitle>Rename</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Group>
          {pages.map((page, index) =>
            page.isSelected ? (
              <Menu.Sub key={"page-options-" + index}>
                <Menu.SubTrigger key="page-trigger">
                  <Menu.ItemTitle>{page.title}</Menu.ItemTitle>
                  <Menu.ItemIcon ios={{ name: "ellipsis" }} />
                </Menu.SubTrigger>
                <Menu.SubContent>
                  <Menu.Sub key="page-options">
                    <Menu.SubTrigger key="page-trigger">
                      <Menu.ItemTitle>Share</Menu.ItemTitle>
                      <Menu.ItemIcon ios={{ name: "square.and.arrow.up" }} />
                    </Menu.SubTrigger>
                    <Menu.SubContent>{getShareOptions()}</Menu.SubContent>
                  </Menu.Sub>

                  <Menu.Item key="initial" disabled={page.isInitial}>
                    <Menu.ItemTitle>Set as Initial Page</Menu.ItemTitle>
                    <Menu.ItemIcon
                      ios={{ name: "house.fill", hierarchicalColor: "#34C760" }}
                    />
                  </Menu.Item>

                  <Menu.Item
                    key="rename"
                    onSelect={() => {
                      Alert.prompt("Rename", "Enter a new name", (newName) => {
                        if (newName) {
                          Alert.alert("Renamed", `Renamed to ${newName}`);
                        }
                      });
                    }}
                  >
                    <Menu.ItemTitle>Rename</Menu.ItemTitle>
                  </Menu.Item>

                  <Menu.Item key="page-duplicate">
                    <Menu.ItemTitle>Duplicate</Menu.ItemTitle>
                  </Menu.Item>

                  <Menu.Group>
                    <Menu.Item
                      key="project-delete"
                      disabled={pages.length === 1 || page.isInitial}
                      destructive
                    >
                      <Menu.ItemTitle>Delete</Menu.ItemTitle>
                    </Menu.Item>
                  </Menu.Group>
                </Menu.SubContent>
              </Menu.Sub>
            ) : (
              <Menu.Item key={"page-" + index}>
                <Menu.ItemTitle>{page.title}</Menu.ItemTitle>
                {page.isInitial && (
                  <Menu.ItemIcon
                    ios={{
                      name: "house.fill",
                      hierarchicalColor: "#34C760",
                    }}
                  />
                )}
              </Menu.Item>
            )
          )}

          {/*  */}
          <Menu.Item key="page-new">
            <Menu.ItemTitle>New Page</Menu.ItemTitle>
            <Menu.ItemIcon ios={{ name: "plus" }} />
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}
