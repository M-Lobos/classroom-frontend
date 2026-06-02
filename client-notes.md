# Front end setup

## Refine Core

*Refine Core es un framework de código abierto basado en React, diseñado para acelerar el desarrollo de aplicaciones web empresariales, paneles de administración, herramientas internas y plataformas B2B. Se encarga de las tareas complejas de programación (como autenticación y redes) para que puedas construir la interfaz a tu medida.*

```bash
npm create refine-app@latest
```

This is the current configuration for this project
```bash
            ^__^
            ■-■¬\_______
            (__)\       )\/\
                ||----w |
                ||     ||
✔ Downloaded remote source successfully.
√ Choose a project template · refine-vite
√ What would you like to name your project?: · mgnt-frontend
√ Choose your backend service to connect: · data-provider-custom-json-rest
√ Do you want to use a UI Framework?: · shadcn
√ Do you want to add example pages?: · no
√ Do you need any Authentication logic?: · none
√ Choose a package manager: · npm
√ Mind sharing your email? (We reach out to developers for free priority support, events, and SWAG kits. We never spam.) · 
```
When is done, 
```bash
npm run dev
```
Notice in your mngt-frontend directory there will be a src folder, inside you will find components, then go to refine-ui you will found all the different componentes created by Refine Core. Below refine-ui, you will find a folder called ui, which contains default shadcn components. 

At the level of components folder we can se the hooks components, which contains the mobile use mobile hooks, this is use to make sites responsive from mobile sizes (some of the components use it to immediately privde mobile responsiveness).

Next we have lib, inside, utils.ts. It contains shadcn utilities to render strings conditionally 

Then you will see a configuration similar to a standar React + Vite config

## Tweakcn
The app is fully compatible with the Tweakcn tool, which allows you to design your shadcn theme. 

Go to [Tweakcn](https://tweakcn.com/) and hit the "Start customazing" button. In its UI you can see some examples of components as dashboards, mail, cards, etc. You may choose from the themes by default or set your own theme. 

Done that, go to "code" (superior right), copy the code and  remove in your App.css file the elements:
```css
@theme inline{...}
:roog {...}
.dark {...}
```
And copy the code you coppied just below the @layer Base elements (both) you see.

## Routing
As we will have many pages, its important to define those routes. This issue is one of the fundamental concepts on Refine Core.

The benefits of the Refine Core integration are:
* Automatic parameter detection in hooks/components
* Automatic redirection after mitation or authentication.
* Set of utility components & hooks which can be used to naviagete btn pages/routes

Since Refine is **router agnostic**, you are responsible for creating your own routes.

If you are using React Router, you'll be defining your routes under the Routes component.

Lets create then a folder named "pages" inside src, and create a file called Dashboard.tsx
```bash
    pwd #check were are you standing
    cd client/mngt-frontend/src
    mkdir pages
    cd pages
    touch Dashboard.tsx
    cpde Dashboard.tsx
```
Inside the component file Dashboard.tsx create a rafce component (dont worry its an empty component for now), then go to App.tsx, identity the <Routes> tag and and notice how inside the <Route> tag element look like this: 
```tsx
//Its important to understand that this route is rendeirng the welcome page you saw in your browser when running npm run dev
<Route index element={<WelcomePage />} />
``` 
We will remove the element value to define a new route, to our component, instead we will use the path attribute (don't forget to import the Dashboard component)

```tsx
<Route path='/' element={<Dashboard />} />
``` 
***Note: *** 
In Refine, `resource` is a central concept, it represents an entity which ties toguether different aspects of your app (check documentation). Commonly reffers to an data entity (like products, orders, blog post, etc), in this project i will refer to classes, subjetcts, students, etc.  

Its an easier way to manage your apps routes and tying those routes to resources (entities) in the DB

Now, in your App.tsx, at the en of `<Regine />` lets define our resources as follows:
```jsx
//other imports
import { Home } from "lucide-react";

// --- rest of the app.jsx

<Refine
    dataProvider={dataProvider}
    notificationProvider={useNotificationProvider()}
    routerProvider={routerProvider}
    options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
      }}
        
    resources={[
        {
            name:'dashboard',
            list: '/',
             meta: {
                label:'home',
                icon: <Home/>
             }
         }
    ]}
>
```

Not forget to import the home icon from lucide-react.

Now, let's add another `<route />`, this time the element inside will be a `<Layout> ... </Layout>` component from `regine-ui/lauout` and then, inside a `<Outlet />` component (renders a matching child route of a parent route, or nothing if no child route matches) from `react-router`. Then Move the Dashboard route inside of this route:

```jsx
<Routes>
    <Route element={
         <Layout>
            <Outlet />
        </Layout>
    }>
        <Route path="/" element={<Dashboard />} />
    </Route>
</Routes>
```
Now, go to the browser or run `npm run dev` and ctrl + click and you will see now we have mounted an intresting layout already, notices you will have:
* Navbar with some intresting features like:
    * Name
    * Button to colapse side bar
    * Toggle theme button (ligth, dark, system)
* Sidebar (to navigate the site)
* Main content viewer space

This way the subjest's routes will be created in our app.

## Creating subjetcs
Now create a subject folder inside pages, and in it create a list.tsx file. 
```bash
pwd #always check were are you working
mkdir subjects
cd subjects
touch list.tsx
code list.tsx
```
Create now a `rafce` `component`. Inside we will list all the subjects (dont mind is it empty just yet)
```tsx
const list = () => {
    return (
        <div>list</div>
    )
}

export default list
```
Now back to your App.tsx, we will add a new route to it by defining a new resourse as follow: 
```jsx
//other imports
import { Home, BookOpen } from "lucide-react";

// --- rest of the app.jsx

<Refine
    dataProvider={dataProvider}
    notificationProvider={useNotificationProvider()}
    routerProvider={routerProvider}
    options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
      }}
        
    resources={[
        {
            name:'dashboard',
            list: '/',
             meta: {
                label:'home',
                icon: <Home/>
             }
         },
        {
            name: 'subjects',
            list: '/subjects',
            create: '/subjects/create',
            meta: {
            label: 'Subjects',
            icon: <BookOpen />
            }
        }
  ]}
>
```
Now you should be able to see another tab in the sidebar, that says "Subject" with an OpenBook icon.

Now we will add a new route group right below the current one:
```jsx
<Routes>
    <Route element={
        <Layout>
         <Outlet />
        </Layout>
    }>
        <Route path="/" element={<Dashboard />} />
            <Route path="/subjects">
            <Route index element={<SubjectList />} ></Route>
        </Route>
</Route>
```

+Create `src/pages/subjects/list.tsx` exporting `SubjectList`, and add `src/pages/subjects/Create.tsx` exporting `SubjectsCreate`.
+Then in `App.tsx`, add a nested create route that renders `SubjectsCreate`:

```jsx
<Routes>
    <Route element={
        <Layout>
            <Outlet />
        </Layout>
    }>
        <Route path="/" element={<Dashboard />} />
            <Route path="/subjects">
                <Route index element={<SubjectList />} />
                <Route path="/create" element={<SubjectsCreate />} />
            </Route>
    </Route>
</Routes>
```
Now, if you click the Subject element in the side bar, you should be the element list rendered in the right side of the layout.

## Data provider

A data provider is where you define how your API (or any data source) works. That way, refine knows where and how to fecth the data, once define refine core will automatically call the right API for each page. This allows you to work without using axios, fecth or setting up tanStack query. 

Go to your list.tsx file. Use some of the refine-ui componentes like listView and breadcrum component. Notice as we use pass the useState value to our search input, using a onChange to trigger it. 

Now below use is used a `<Select>` component form components-UI where will live the department were lives the we weant to ger thr subject from. So that would be the purpose of this `<Select>` component. As before, it used a useState hook called selectedDepartment where the initial value will be 'all' of them. Then the value of the `<Select>` component wil lbe selectedDeparment. 

Add inside a SelectedTrigger, a componente also coming from components Ui, also, `<selectContent>` at the same high and `<selectItem> `inside, this latest will have a value = 'all' , then create a list with the current departments. This component will consuime this list from abroad, lets create a folder inside `src` called `constants`, inside crate a file called index.ts

```bash
pwd 
cd client/mngt-frontend/src
mkdir constant
cd constant
touch index.ts
code index.ts
```
Inside define the DEPARTMENTS LIST, the map it to present it in the right format to be displayed as a list:

```ts
export const DEPARTMENTS = [
    'CS', 
    'Math', 
    'English',
    'Ciencice'
];

export const DEPARTMENTS_OPTIONS = DEPARTMENTS.map((dept) => ({
    value:dept,
    label:dept,
}));
```

Now back on list.tsx we map insdie our DEPARTMENT_OPTIONS and call out the value and label. 
```tsx
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Search } from "lucide-react";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DEPARTMENTS_OPTIONS } from "@/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create";

const SubjectList = () => {
    const [searchQuery, setsearchQuery] = useState('');
    const [selectedDepartment, setselectedDepartment] = useState('all')

    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title" >Subjects</h1>

            <div className="intro-row">
                <p>Quick Access to essenctial metrics and management tools</p>

                <div className="actoin-row">
                    <div className="search-field">
                        <Search className="search-icon " />
                        <input type="text"
                            placeholder="Search by name..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setsearchQuery(e.target.value)} 
                        />
                    </div>

                    <div className="flex fap-2 w-full sm:w-auto">
                        <Select value={selectedDepartment}
                            onValueChange={setselectedDepartment}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>
                                    All departments
                                </SelectItem>
                                {DEPARTMENTS_OPTIONS.map(department => (
                                    <SelectItem key={department.value} value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <CreateButton/>
                    </div>
                </div>
            </div>
        </ListView>
    )
}

export default SubjectList;
```

At this point, if you check your app display on your browser (if dont, run: npm run dev) you will sé the collapsable element with all the deparments inside and the input for searching as well. This elemement will be used to filter the list of subjects.

Lets create a table for our data. Below all `<div>'s` (and before the close `</listView>`). Use the `<DataTable>` component and `<useTable>` hook (that allows to fetch data for the table, even using filters) from components/redine-ui and redinedev/react-table respectibly. 

As we define the subjectTable using the elements mentioned above `(<useTable<Subject>())`. Subject its a type that is yet to define. And the best place to do so (as you may imagine) its within its own type file inside its own folder inside src directory.
```bash
pwd
mkdir types
touch types.ts
code types.ts
```

Inside this file, create our first type called Subject, wich will have: 
* id
* name
* code
* description
* department
* createdAt

```tsx
export type Subject = {
    id: number,
    name: string,
    code: string,
    description: string,
    department: string,
    createdAt: string,
}
```

Now, back to the `<useTable>`, inside of it, define its properties with refineCoreProps, and then, above of it the columns. This will latest will simply an array, but first it must be wrapped in a useMemo hook (coming from react), why we do this like this; the ide af memorizing the colums is avoid the recreating each column on every render. Also se define the type within that useMemo, like ColumnDef, specifically of the type subject, and displaying as an array. Finally we set the callback function of this useMemo, where it will reuslt in an array. Within that array, we have different columns, where each col will have an id, given by the code, then the accesorkeyl, wich is also code from our subject type, size: 100, then the header with a `<p> `tag inside, finally the cell value as another callback function that destructures the value of the actual cell, returning a `<badge> `component from  components/ui with a getValue(). Dont forget to place the dependency array at the end of the useMemo. The process for evey column is practically the same. Lets make some consideration about this first, first in name we will change `<badge>` for `<span> `and also add a filtering function (wich with out this schema would be much more work) like `filterFn: 'includesString'` wich enable text-based filtering on this column (note: put an eye below regarding `<span>` and `<badge>` tags)
```tsx
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DEPARTMENTS_OPTIONS } from "@/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { Subject } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";


const SubjectList = () => {
    const [searchQuery, setsearchQuery] = useState('');
    const [selectedDepartment, setselectedDepartment] = useState('all');

    const subjectTable = useTable<Subject>({
        columns: useMemo<ColumnDef<Subject>[]>(() => [
            {
                id: 'code',
                accessorKey: 'code',
                size: 100,
                header: () => <p className="column-title ml-2">code</p>,
                cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
            },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className="column-title">Name</p>,
                cell: ({ getValue }) => <span className="text-fore">{getValue<string>()}</span>,
                filterFn: 'includesString'
            },
            {
                id: 'department',
                accessorKey: 'department',
                size: 150,
                header: () => <p className="column-title">Departments</p>,
                cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
            },
            {
                id: 'description',
                accessorKey: 'description',
                size: 350,
                header: () => <p className="column-title">Description</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
            },


        ], [])
        ,
        refineCoreProps: {
            resource: 'subjetcs',
            pagination: { pageSize: 10, mode: 'server' },
            filters: {},
            sorters: {},
        }
    });

    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title" >Subjects</h1>
            <div className="intro-row">
                <p>Quick Access to essenctial metrics and management tools</p>
                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon" />
                        <input type="text"
                            placeholder="Search by name..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setsearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select value={selectedDepartment}
                            onValueChange={setselectedDepartment}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>
                                    All departments
                                </SelectItem>
                                {DEPARTMENTS_OPTIONS.map(department => (
                                    <SelectItem key={department.value} value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <CreateButton />
                    </div>
                </div>
            </div>

            <DataTable table={subjectTable} />
        </ListView>
    );
};

export default SubjectList;

```

Now you should be able to see the table in the app. Notice that have define filters and sorters in our refineCoreProps.To enable the filters, as it follows: First enable the permanent filter, where we will define an array of different filters (Must define this below the useStates above).

Notice the logic in the filter, if selectedDepartment is all, returns an empty array (no filter params selected), but if any other value is selected, it will return the params with which the field will be filter against, then this will passed to the data provider by Refine, then they will call out our backend API with those parameters. The Search filter is smiliar but much more intuitive.

```tsx
const SubjectList = () => {
    const [searchQuery, setsearchQuery] = useState('');
    const [selectedDepartment, setselectedDepartment] = useState('all');

    const departmenFilters = selectedDepartment === 'all' ? [] : [
        {
            field: 'department',
            operator: 'eq' as const,
            value: selectedDepartment
        }
    ];

    const searchFilters = searchQuery ? [
        {
            field: 'name',
            operator: 'contains' as const,
            value: searchQuery
        }
    ] : [];

    const subjectTable = useTable<Subject>({
        columns: useMemo<ColumnDef<Subject>[]>(() => [
            {
                id: 'code',
                accessorKey: 'code',
                size: 100,
                header: () => <p className="column-title ml-2">code</p>,
                cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
            },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className="column-title">Name</p>,
                cell: ({ getValue }) => <span className="text-fore">{getValue<string>()}</span>,
                filterFn: 'includesString'
            },
            {
                id: 'department',
                accessorKey: 'department',
                size: 150,
                header: () => <p className="column-title">Departments</p>,
                cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
            },
            {
                id: 'description',
                accessorKey: 'description',
                size: 350,
                header: () => <p className="column-title">Description</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
            },


        ], [])
        ,
        refineCoreProps: {
            resource: 'subjetcs',
            pagination: { pageSize: 10, mode: 'server' },
            filters: {
                permanent: [...departmenFilters, ...searchFilters]
            },
            sorters: {},
        }
    });

    //return code block
}
```
Now, for sorting is even simplier, we define the ide and how to sort (descendant or ascendant).
```tsx
refineCoreProps: {
            resource: 'subjetcs',
            pagination: { pageSize: 10, mode: 'server' },
            filters: {
                permanent: [...departmenFilters, ...searchFilters]
            },
            sorters: {
                initial: [
                    {
                        field: 'id',
                        order: 'desc'
                    }
                ]
```
Whit all this, the logic to fetch data is al done, and the table is also displaying via `<subjectTable>` component.

## Fecthing Data
The reason there is no data to display, but the app doesnt crahs is cause the data provider is pointed to a fake REST API. Go to providers folder, inside address the contant.ts file, there you will see the end poing of a [fake api](https://api.fake-restrefine.dev). When calling the data it is trying to reach the /subject route, that doesnt exist in taht fake api, so, lets craete a mock data provider and connect to the reifne ui. Inside providers folder, craete a mockData.ts file where we will manage the mockData for now. Before we must create a subjectMockData.ts file for a dummy data set: 
```jsx
import { Subject } from "@/types/types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CSCI-2101",
        name: "Data Structures and Algorithms",
        department: "Computer Science",
        description: "An introduction to core computational structures including linked lists, trees, graphs, and hash tables, alongside efficiency analysis using Big O notation.",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        code: "MATH-3302",
        name: "Linear Algebra and Vector Calculus",
        department: "Mathematics",
        description: "Covers vector spaces, linear transformations, matrices, eigenvalues, and multi-variable integration with applications to physical systems.",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        code: "PHYS-1105",
        name: "Classical Mechanics",
        department: "Physics",
        description: "A foundational course covering Newtonian mechanics, conservation laws, rotational dynamics, and oscillatory motion for science and engineering majors.",
        createdAt: new Date().toISOString()
    }
];
```
Now our mock data provider should ook like this:
```jsx
import { GetListParams, DataProvider, GetListResponse, BaseRecord } from "@refinedev/core";
import { MOCK_SUBJECTS } from "./subjectMockData";

export const dataProvider: DataProvider = {

    getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
        if (resource != 'subjects') return { data: [] as TData[], total: 0 }
        return {
            //make it consume the dummy data from subjectMockData.ts
            data: MOCK_SUBJECTS as unknown as TData[],
            total: MOCK_SUBJECTS.length,
        }
    },

    getOne: async () => { throw new Error('This function is not present in mock') },
    create: async () => { throw new Error('This function is not present in mock') },
    update: async () => { throw new Error('This function is not present in mock') },
    deleteOne: async () => { throw new Error('This function is not present in mock') },

    getApiUrl: () => '',
}

```
Now in app.tsx we find dataprovider and we replace it by this one.

push changes too branch

# Backend set up

Visit this repo to know how to build the [base structure](https://github.com/M-Lobos/Basic-PERN-structure) for the back end used in this project

Check the documentation on the server folder called server-notes.md
 
## Back to deal with the REST DATA PROVIDER
After setting the backend and the basic routes.

So far, there is a basic understanding of how data provider works using a mock data provider with static data, implemented the enpoint and used them on the subjects page to display all the subjects without filtering or pagination. 

In this point, the mock data provider will be replaced by a REST data provider. If checking the documentaion on refine, Refine offers a data provider that manages the build of custom data providers for REST APIs. Refine just need:
* API's base url
* rules
With this, Refine will automatically handle fetching, creating, updating and deleting data without manual feching or axios calls.

Secure being in the front side project. 
```bash
pwd
cd #if necesary
npm install @refinedev/rest
```
Now, there is some issue to address with the types. Currently the app just handle types for subjects, but that isn't enough for this app (ListResponse, CreateResponse, GetOneResponse, UploadWidgetValue, UploadWidgetProps, UserRole, User, Schedule, Department, ClassDetails, SignUpPayload, are also needed) so:
```ts
export type Subject = {
    id: number;
    name: string;
    code: string;
    description: string;
    department: string;
    createdAt?: string;
};

export type ListResponse<T = unknown> = {
    data?: T[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type CreateResponse<T = unknown> = {
    data?: T;
};

export type GetOneResponse<T = unknown> = {
    data?: T;
};

declare global {
    interface CloudinaryUploadWidgetResults {
        event: string;
        info: {
            secure_url: string;
            public_id: string;
            delete_token?: string;
            resource_type: string;
            original_filename: string;
        };
    }

    interface CloudinaryWidget {
        open: () => void;
    }

    interface Window {
        cloudinary?: {
            createUploadWidget: (
                options: Record<string, unknown>,
                callback: (
                    error: unknown,
                    result: CloudinaryUploadWidgetResults
                ) => void
            ) => CloudinaryWidget;
        };
    }
}

export interface UploadWidgetValue {
    url: string;
    publicId: string;
}

export interface UploadWidgetProps {
    value?: UploadWidgetValue | null;
    onChange?: (value: UploadWidgetValue | null) => void;
    disabled?: boolean;
}

export enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin",
}

export type User = {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    role: UserRole;
    image?: string;
    imageCldPubId?: string;
    department?: string;
};

export type Schedule = {
    day: string;
    startTime: string;
    endTime: string;
};

export type Department = {
    id: number;
    name: string;
    description: string;
};

export type ClassDetails = {
    id: number;
    name: string;
    description: string;
    status: "active" | "inactive";
    capacity: number;
    courseCode: string;
    courseName: string;
    bannerUrl?: string;
    bannerCldPubId?: string;
    subject?: Subject;
    teacher?: User;
    department?: Department;
    schedules: Schedule[];
    inviteCode?: string;
};

export type SignUpPayload = {
    email: string;
    name: string;
    password: string;
    image?: string;
    imageCldPubId?: string;
    role: UserRole;
};
``` 
Define the VITE_BACKEND_BASE_URL variable in the .env file (Be aware that, if your backend uses another port, e.g., 4001, and this VITE_BACKEND_BASE_URL variable does NOT match it, it will be like the front would be knocking the door in an incorrect address to make the request).
```txt
VITE_BACKEND_BASE_URL='http://localhost:3000/api/' 
```
And instead import this variable, we will craete a constant related to it. Address the constant folder and inside define the constant to export as:
```ts
export const BASE_URL =  import.meta.env.VITE_API_URL;
```
So its use will now more cleaner.

Now, go to the providers folder and create a `restData.ts` file. The general idea is quite similiar to the structure built in mockData.ts before.

Start with the options for the data provider using the `CreateDataProviderOptions` from `@refinedev/rest` package, then craete an objet that will hold the options specifically for the `getList` method.

Then craete a new `dataProvider` (destructured) as `createDataProvider` method (also from `@refinedev/rest`) that recives the `BACKEND_BASE_URL` and the `options` object created above. Then export the `{dataProvider}`, as follow: 

```ts
import { BACKEND_BASE_URL } from "@/constants"
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest"

const options: CreateDataProviderOptions = {
    getList: {
        getEndpoint: ({response}) => resource,

        mapResponse: async (response) => {
            const payload: ListResponse = await response.json();

            return payload.data ?? [];
        },

        getTotalCount: async (response) => {
            const payload: ListResponse = await response.json();
            
            return payload.pagination?.total ?? payload.data?.length ?? 0;
        }
    }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export {dataProvider};
```

Now inside the getList object, define the endpoints

```ts
import { BACKEND_BASE_URL } from "@/constants"
import { ListResponse } from "@/types/types";
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest"

const options: CreateDataProviderOptions = {
    getList: {
        getEndpoint: ({resource}) => resource,

        mapResponse: async (response) => {
            const payload: ListResponse = await response.json();

            return payload.data ?? [];
        },

        getTotalCount: async (response) => {
            const payload: ListResponse = await response.json();
            
            return payload.pagination?.total ?? payload.data?.length ?? 0;
        }
    }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export {dataProvider};
```
The `App.ts` file is still asking data from the `subjectMockData.ts` file, in order to consume the right data provider, import the `restData.ts` data provider file from the `providers` folder, whitin `App.ts` instead the mock data file:

```ts
import { Refine, /* WelcomePage */ } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import Dashboard from "./pages/Dashboard";
import { BookOpen, Home } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectList from "./pages/subjects/List";
import SubjectsCreate from "./pages/subjects/Create";
import { dataProvider } from "./providers/restData"; //<-- HERE MAKE THE PROVIDER REPLACE.

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: {
                    label: 'home',
                    icon: <Home />
                  }
                },
                {
                  name: 'subjects',
                  list: '/subjects',
                  create: '/subjects/create',
                  meta: {
                    label: 'Subjects',
                    icon: <BookOpen />
                  }
                }
              ]}
            >
              <Routes>
                <Route element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/subjects">
                    <Route index element={<SubjectList />} />
                    <Route path="create" element={<SubjectsCreate />} />
                  </Route>
                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

```
If done right, refine will handle (backstage) in a way that allows not to have to change anything within the app. The frontend should be displaying now the data craeted on Neon DB services rather the mock up data. 

## Querying the data provider
So far, the data provider is setted, also is the backend (including filters). Though the filters still are not working in the frontend side (like the search bar, or the deployable list element), to do so (knowing that this is already working in the backend), must build the search query params, and let refine know about them. 

Go to restData.ts file, inside of getList object, below getEndpoint build the query params:

```ts
import { BACKEND_BASE_URL } from "@/constants"
import { ListResponse } from "@/types/types";
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest"

const options: CreateDataProviderOptions = {
    getList: {
        getEndpoint: ({ resource }) => resource,

        //QUERY PARAMS
        buildQueryParams: async ({ resource, pagination, filters }) => {
            const page = pagination?.currentPage ?? 1;
            const pageSize = pagination?.pageSize ?? 10;

            const params: Record<string, string|number> = { page, limit: pageSize };

            filters?.forEach((filter) => {
                const field = 'field' in filter ? filter.field : '';
                //cast it in to string for params
                const value = String(filter.value);
                
                if(resource === 'subjects') {
                    if(field === 'department') params.department = value;
                    if(field === 'name' || field === 'code') params.search = value;
                }
            });

            return params;
        },

        mapResponse: async (response) => {
            const payload: ListResponse = await response.json();

            return payload.data ?? [];
        },

        getTotalCount: async (response) => {
            const payload: ListResponse = await response.json();

            return payload.pagination?.total ?? payload.data?.length ?? 0;
        }
    }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };
```

Push this feature
```bash
pwd #always check where are you working
cd client
git checkout -b feat/rest-data-provider
git add .
git commit -m "implement rest-data provider"
git push
git push --set-upstream origin feat/rest-data-provider
```




If name or code is typed in the search bar, it should work. Now, to implement the mechanism to make the deparment's filter through the display list element a get request that calls the department router, and then display it (instead of the 'fake' data currently being displayed).

