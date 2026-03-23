"use dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

import ShadLayout from "./shad-layout";
import { IS_DOM } from "expo/dom";
import { useGlobalButtonHaptics } from "../global-button-haptics";

const baseUrl = IS_DOM ? process.env.EXPO_DOM_BASE_URL : "";

export default function OrdersRoute({
  onButtonClick,
}: {
  dom?: import("expo/dom").DOMProps;
  ref?: import("react").RefObject<
    import("react-native-webview").WebView | null
  >;
  onButtonClick: (size: number) => Promise<void>;
}) {
  useGlobalButtonHaptics(onButtonClick);

  return (
    <ShadLayout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <TabsContentAll />
          </TabsContent>
          <TabsContent value="active">
            <TabsContentAll />
          </TabsContent>
          <TabsContent value="draft">
            <TabsContentAll />
          </TabsContent>
        </Tabs>
      </main>
    </ShadLayout>
  );
}

function TabsContentAll() {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/placeholder.svg"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                Laser Lemonade Machine
              </TableCell>
              <TableCell>
                <Badge variant="outline">Draft</Badge>
              </TableCell>
              <TableCell>$499.99</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={baseUrl + "/placeholder.svg"}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                Hypernova Headphones
              </TableCell>
              <TableCell>
                <Badge variant="outline">Active</Badge>
              </TableCell>
              <TableCell>$129.99</TableCell>
              <TableCell className="hidden md:table-cell">100</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-10-18 03:21 PM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={baseUrl + "/placeholder.svg"}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">AeroGlow Desk Lamp</TableCell>
              <TableCell>
                <Badge variant="outline">Active</Badge>
              </TableCell>
              <TableCell>$39.99</TableCell>
              <TableCell className="hidden md:table-cell">50</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-11-29 08:15 AM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={baseUrl + "/placeholder.svg"}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                TechTonic Energy Drink
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Draft</Badge>
              </TableCell>
              <TableCell>$2.99</TableCell>
              <TableCell className="hidden md:table-cell">0</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-12-25 11:59 PM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={baseUrl + "/placeholder.svg"}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                Gamer Gear Pro Controller
              </TableCell>
              <TableCell>
                <Badge variant="outline">Active</Badge>
              </TableCell>
              <TableCell>$59.99</TableCell>
              <TableCell className="hidden md:table-cell">75</TableCell>
              <TableCell className="hidden md:table-cell">
                2024-01-01 12:00 AM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={baseUrl + "/placeholder.svg"}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">Luminous VR Headset</TableCell>
              <TableCell>
                <Badge variant="outline">Active</Badge>
              </TableCell>
              <TableCell>$199.99</TableCell>
              <TableCell className="hidden md:table-cell">30</TableCell>
              <TableCell className="hidden md:table-cell">
                2024-02-14 02:14 PM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
