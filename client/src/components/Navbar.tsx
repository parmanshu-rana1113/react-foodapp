import { Link } from "react-router-dom";
import { Menubar, MenubarContent, MenubarTrigger, MenubarMenu, MenubarItem } from "./ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, SunIcon, User2, UtensilsCrossed } from "lucide-react";


import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const Navbar = () => {
    const admin = false;
    const loading = false;
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-14 w-full">
                <Link to={"/"}>
                    <h1 className="font-bold md:font-extrabold text-2xl  text-black ">FODDIZM</h1>

                </Link>

                <div className="hidden md:flex item-center gap-10">

                    <div className="hidden md:flex items-center gap-6 ">
                        <Link to="/" className=" text-black">Home</Link>
                        <Link to="/profile" className=" text-black">Profile</Link>
                        <Link to="/order" className=" text-black">Order</Link>
                    </div>


                    {admin && (
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger>
                                    DASHBOARD
                                </MenubarTrigger>
                                <MenubarContent>
                                    <Link to="/admin/restaurant">
                                        <MenubarItem>Restaurant</MenubarItem> </Link>
                                    <Link to="/admin/menu">
                                        <MenubarItem>Menu</MenubarItem></Link>
                                    <Link to="/admin/order">
                                        <MenubarItem>Order</MenubarItem></Link>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    )}


                    <div className="flex items-center gap-4">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button>
                                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem >
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Dark
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Link to="/cart" className="relative cursor-pointer  text-black">
                            <ShoppingCart />
                            <button className="absolute -inset-y-4 text-xs rounded-full h-4 w-5 bg-white text-black p-1 left-2">5</button>
                        </Link>

                        <div>
                            <Avatar>
                                <AvatarImage/>
                                    <AvatarFallback>CN</AvatarFallback>
                        
                            </Avatar>
                        </div>


                        <div>
                            {
                                loading ? (<Button className="bg-orange hover:bg-hoverorange">
                                    <Loader2 className="mr-2 w-5 h- animate-spin" />wait
                                </Button>) : <Button className="bg-orange hover:bg-hoverorange">Logout</Button>
                            }

                        </div>
                    </div>
                </div>
                <div className="md:hidden lg:hidden">
                    {/* MOBILE RESPONSIVE */}
                    <MobileNavbar />

                </div>
            </div>
        </div>
    )
}

export default Navbar;

const MobileNavbar = () => {
    // const user = true;
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-7">
                    <SheetTitle>Foddizm</SheetTitle>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button>
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Dark
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </SheetHeader>
                <Separator className="my-2" />

                <SheetDescription className="flex-1">
                    <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-400 px-3 py-2 rounded-md cursor-pointer hover:text-gray-900">
                        <User2 className="text-black" />
                        <span className="text-black">Profile</span>
                    </Link>

                    <Link to="/order/status" className="flex items-center gap-4 hover:bg-gray-400 px-3 py-2 rounded-md cursor-pointer hover:text-gray-900">
                        <HandPlatter className="text-black" />
                        <span className="text-black">Order</span>
                    </Link>

                    <Link to="/cart" className="flex items-center gap-4 hover:bg-gray-400 px-3 py-2 rounded-md cursor-pointer hover:text-gray-900">
                        <ShoppingCart className="text-black" />
                        <span className="text-black">Cart(0)</span>
                    </Link>

                    <Link to="/admin/restaurant" className="flex items-center gap-4 hover:bg-gray-400 px-3 py-2 rounded-md cursor-pointer hover:text-gray-900">
                        <UtensilsCrossed className="text-black" />
                        <span className="text-black">Restaurant</span>
                    </Link>

                    <Link to="/admin/menu" className="flex items-center gap-4 hover:bg-gray-400 px-3 py-2 rounded-md cursor-pointer hover:text-gray-900">
                        <SquareMenu className="text-black" />
                        <span className="text-black">Menu</span>
                    </Link>

                    <Link to="/admin/orders" className="flex items-center gap-4 hover:bg-gray-400 px-3 py-2 rounded-md cursor-pointer hover:text-gray-900">
                        <PackageCheck className="text-black" />
                        <span className="text-black">Restaurant Order</span>
                    </Link>


                </SheetDescription>
                <SheetFooter className="flex flex-col gap-4">

                    <div className="flex fles-row item-center gap-2">
                        <Avatar>
                            <AvatarImage>
                                <AvatarFallback>CN</AvatarFallback>
                            </AvatarImage>
                        </Avatar>
                        <h2 className="font-bold text-2xl">Foodizm</h2>
                    </div>


                    <SheetClose asChild>
                        <Button type="submit" className="bg-orange hover:bg-hoverorange">Logout</Button>
                    </SheetClose>

                </SheetFooter>
            </SheetContent>
        </Sheet >
    )
}

