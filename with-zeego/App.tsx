import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";

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
        <Ionicons name="options" color={"black"} size={24} />
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
        <Ionicons name="menu-outline" color={"black"} size={24} />
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
        <Ionicons name="options" color={"black"} size={24} />
      </StylesMenu>

      <UISettingsMenu>
        <Ionicons name="settings-outline" color={"black"} size={24} />
      </UISettingsMenu>

      <ShareMenu>
        <Ionicons name="share-outline" color={"black"} size={24} />
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {SORT_FILTERS.map(({ value, label }) => (
            <DropdownMenu.CheckboxItem
              key={value}
              value={value === sort}
              onValueChange={(next) => next && setSort(value)}
            >
              <DropdownMenu.ItemIndicator />
              <DropdownMenu.ItemTitle>{label}</DropdownMenu.ItemTitle>
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Group>

        <DropdownMenu.Group>
          {DISPLAY_FILTERS.map(({ value, label }) => (
            <DropdownMenu.CheckboxItem
              key={value}
              value={value === display}
              onValueChange={(next) => next && setDisplay(value)}
            >
              <DropdownMenu.ItemIndicator />
              <DropdownMenu.ItemTitle>{label}</DropdownMenu.ItemTitle>
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

const FIGMA_DEFAULT_COLORS: { hex: string; name: string }[] = [
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

function StylesMenu({ children }: { children?: React.ReactElement }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>Styles</DropdownMenu.Label>

        <DropdownMenu.Sub key="types-menu">
          <DropdownMenu.SubTrigger key="types-trigger">
            <DropdownMenu.ItemTitle>Type</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "textformat" }} />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Group>
              {TYPES.map((typeItem) => (
                <DropdownMenu.Item key={typeItem.name}>
                  <DropdownMenu.ItemTitle>
                    {typeItem.name}
                  </DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemSubtitle>
                    {`${typeItem.size}, ${typeItem.weight}`}
                  </DropdownMenu.ItemSubtitle>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Group>
            <DropdownMenu.Item key={"types-new"}>
              <DropdownMenu.ItemTitle>New Type</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon ios={{ name: "plus" }} />
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Sub key="spacing-menu">
          <DropdownMenu.SubTrigger key="spacing-trigger">
            <DropdownMenu.ItemTitle>Spacing</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "arrow.left.and.right" }} />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Group>
              {SPACINGS.map((spacing) => (
                <DropdownMenu.Item key={String(spacing)}>
                  <DropdownMenu.ItemTitle>
                    {String(spacing)}
                  </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Group>

            <DropdownMenu.Item key={"spacing-new"}>
              <DropdownMenu.ItemTitle>New Spacing</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon ios={{ name: "plus" }} />
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Sub key="gradient-menu">
          <DropdownMenu.SubTrigger key="gradient-trigger">
            <DropdownMenu.ItemTitle>Gradients</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "circle.lefthalf.fill" }} />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Group>
              <DropdownMenu.Item key={"top-gradient"}>
                <DropdownMenu.ItemTitle>Top Gradient</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "circle.bottomhalf.fill",
                  }}
                />
              </DropdownMenu.Item>
              <DropdownMenu.Item key={"bottom-gradient"}>
                <DropdownMenu.ItemTitle>Bottom Gradient</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "circle.tophalf.fill",
                  }}
                />
              </DropdownMenu.Item>
            </DropdownMenu.Group>

            <DropdownMenu.Item key={"gradient-new"}>
              <DropdownMenu.ItemTitle>New Gradient</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon ios={{ name: "plus" }} />
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Sub key="colors-menu">
          <DropdownMenu.SubTrigger key="colors-trigger">
            <DropdownMenu.ItemTitle>Colors</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "eyedropper" }} />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Group>
              {FIGMA_DEFAULT_COLORS.map((color) => (
                <DropdownMenu.Item key={color.name}>
                  <DropdownMenu.ItemTitle>{color.name}</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemSubtitle>
                    {color.hex}
                  </DropdownMenu.ItemSubtitle>

                  <DropdownMenu.ItemIcon
                    ios={{
                      name: "circle.fill",
                      // Requires iOS 15+
                      hierarchicalColor: color.hex,
                    }}
                  />
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Group>

            <DropdownMenu.Item key={"colors-new"}>
              <DropdownMenu.ItemTitle>New Color</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon ios={{ name: "plus" }} />
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function MoreMenu({ children }: { children?: React.ReactElement }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {/* TODO: Horizontal picker: | A | B | C | D | */}

          <DropdownMenu.Sub key="project-options">
            <DropdownMenu.SubTrigger key="project-trigger">
              <DropdownMenu.ItemTitle>Share</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon ios={{ name: "square.and.arrow.up" }} />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              {getShareOptions()}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        {/*  */}
        <DropdownMenu.Group>
          <DropdownMenu.Item key="rename">
            <DropdownMenu.ItemTitle>Rename</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        {/*  */}
        <DropdownMenu.Group>
          <DropdownMenu.Sub key="properties">
            <DropdownMenu.SubTrigger key="properties-trigger">
              <DropdownMenu.ItemTitle>Properties</DropdownMenu.ItemTitle>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item key="copy">
                <DropdownMenu.ItemTitle>
                  Copy Page Properties
                </DropdownMenu.ItemTitle>
              </DropdownMenu.Item>

              <DropdownMenu.Item key="paste" disabled>
                <DropdownMenu.ItemTitle>
                  Paste Properties
                </DropdownMenu.ItemTitle>
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Sub key="stack">
            <DropdownMenu.SubTrigger key="stack-trigger">
              <DropdownMenu.ItemTitle>Add to New Stack</DropdownMenu.ItemTitle>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item key="stack">
                <DropdownMenu.ItemTitle>Stack</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon ios={{ name: "square.2.layers.3d" }} />
              </DropdownMenu.Item>

              <DropdownMenu.Item key="stack-v">
                <DropdownMenu.ItemTitle>Stack V</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon ios={{ name: "arrow.down" }} />
              </DropdownMenu.Item>

              <DropdownMenu.Item key="stack-h">
                <DropdownMenu.ItemTitle>Stack H</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon ios={{ name: "arrow.right" }} />
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Sub key="fill">
            <DropdownMenu.SubTrigger key="fill-trigger">
              <DropdownMenu.ItemTitle>Auto Fill</DropdownMenu.ItemTitle>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item key="unsplash">
                <DropdownMenu.ItemTitle>Unsplash</DropdownMenu.ItemTitle>
              </DropdownMenu.Item>
              <DropdownMenu.Item key="assets">
                <DropdownMenu.ItemTitle>My Assets</DropdownMenu.ItemTitle>
              </DropdownMenu.Item>
              <DropdownMenu.Item key="text">
                <DropdownMenu.ItemTitle>
                  Placeholder Text
                </DropdownMenu.ItemTitle>
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
      {/*  */}
    </DropdownMenu.Root>
  );
}

function UISettingsMenu({ children }: { children?: React.ReactElement }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>UI Settings</DropdownMenu.Label>
        {/* TODO: Horizontal picker: | A | O | C | */}

        <DropdownMenu.Group>
          <DropdownMenu.Item key="outlines">
            <DropdownMenu.ItemTitle>Outlines</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "app.dashed" }} />
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          <DropdownMenu.Item key="touches">
            <DropdownMenu.ItemTitle>Touch Indicator</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "hand.tap" }} />
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function getShareOptions() {
  return (
    <>
      <DropdownMenu.Group>
        <DropdownMenu.Item key="upgrade">
          <DropdownMenu.ItemTitle>Upgrade Plan</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemSubtitle>
            Get unlimited projects and App Clips
          </DropdownMenu.ItemSubtitle>
        </DropdownMenu.Item>
      </DropdownMenu.Group>

      <DropdownMenu.Group>
        <DropdownMenu.Item key="editor">
          <DropdownMenu.ItemTitle>Editor Link</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemSubtitle>
            Copy link to Editor
          </DropdownMenu.ItemSubtitle>
          <DropdownMenu.ItemIcon ios={{ name: "person.2.fill" }} />
        </DropdownMenu.Item>
      </DropdownMenu.Group>

      <DropdownMenu.Group>
        <DropdownMenu.Item key="more">
          <DropdownMenu.ItemTitle>More</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon ios={{ name: "ellipsis" }} />
        </DropdownMenu.Item>

        <DropdownMenu.Item key="app-clip-imessage">
          <DropdownMenu.ItemTitle>
            Share Prototype with App Clip
          </DropdownMenu.ItemTitle>
          <DropdownMenu.ItemSubtitle>
            Send with Messages
          </DropdownMenu.ItemSubtitle>
          <DropdownMenu.ItemIcon ios={{ name: "message.fill" }} />
        </DropdownMenu.Item>

        <DropdownMenu.Item key="app-clip">
          <DropdownMenu.ItemTitle>
            Share Prototype with App Clip
          </DropdownMenu.ItemTitle>
          <DropdownMenu.ItemSubtitle>Copy Link</DropdownMenu.ItemSubtitle>
          <DropdownMenu.ItemIcon ios={{ name: "apple.logo" }} />
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </>
  );
}

function ShareMenu({ children }: { children?: React.ReactElement }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>Share</DropdownMenu.Label>

        {getShareOptions()}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Ionicons
            name="arrow-down-circle-outline"
            color={"black"}
            size={24}
          />
          <Text style={{ fontWeight: "bold" }}>
            {pages.find((page) => page.isSelected).title}
          </Text>
        </View>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Sub key="project-options">
          <DropdownMenu.SubTrigger key="project-trigger">
            <DropdownMenu.ItemTitle>{projectName}</DropdownMenu.ItemTitle>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Sub key="project-options">
              <DropdownMenu.SubTrigger key="project-trigger">
                <DropdownMenu.ItemTitle>Share</DropdownMenu.ItemTitle>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                {getShareOptions()}
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Item key="project-rename">
              <DropdownMenu.ItemTitle>Rename</DropdownMenu.ItemTitle>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Group>
          {pages.map((page, index) =>
            page.isSelected ? (
              <DropdownMenu.Sub key={"page-options-" + index}>
                <DropdownMenu.SubTrigger key="page-trigger">
                  <DropdownMenu.ItemTitle>{page.title}</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon ios={{ name: "ellipsis" }} />
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Sub key="page-options">
                    <DropdownMenu.SubTrigger key="page-trigger">
                      <DropdownMenu.ItemTitle>Share</DropdownMenu.ItemTitle>
                      <DropdownMenu.ItemIcon
                        ios={{ name: "square.and.arrow.up" }}
                      />
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                      {getShareOptions()}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>

                  <DropdownMenu.Item key="initial" disabled={page.isInitial}>
                    <DropdownMenu.ItemTitle>
                      Set as Initial Page
                    </DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                      ios={{ name: "house.fill", hierarchicalColor: "#34C760" }}
                    />
                  </DropdownMenu.Item>

                  <DropdownMenu.Item key="page-rename">
                    <DropdownMenu.ItemTitle>Rename</DropdownMenu.ItemTitle>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item key="page-duplicate">
                    <DropdownMenu.ItemTitle>Duplicate</DropdownMenu.ItemTitle>
                  </DropdownMenu.Item>

                  <DropdownMenu.Group>
                    <DropdownMenu.Item
                      key="project-delete"
                      disabled={pages.length === 1 || page.isInitial}
                      destructive
                    >
                      <DropdownMenu.ItemTitle>Delete</DropdownMenu.ItemTitle>
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            ) : (
              <DropdownMenu.Item key={"page-" + index}>
                <DropdownMenu.ItemTitle>{page.title}</DropdownMenu.ItemTitle>
                {page.isInitial && (
                  <DropdownMenu.ItemIcon
                    ios={{
                      name: "house.fill",
                      hierarchicalColor: "#34C760",
                    }}
                  />
                )}
              </DropdownMenu.Item>
            )
          )}

          {/*  */}
          <DropdownMenu.Item key={"page-new"}>
            <DropdownMenu.ItemTitle>New Page</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "plus" }} />
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
