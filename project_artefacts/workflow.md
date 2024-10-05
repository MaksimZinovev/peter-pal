# Workflow

## Outline

- client
    - [x] describe app 
    - [x] provied app type 
- architect 
    - [x] write architecture
- spec writer
    - [x] write project details 
    - [x] ask questions
    - [x] break down stories 
    - [x] break down user tasks
- tech lead 
    - [x] create development plan (xxx_project_tasks.md)
- [moa-app] Ted: full stack software developer. Task breakdown
    - breakdown single development task  (xxx_breakdown.md)
    - review code and instructions
    - update code and instructions using recommendations
    - save task description and instructions in a separate file which can be later shared with agent
    - parse task (xxx_parse_tasks.md)
- Continue.dev (Claude Sonnet 3.5)
    - use parsed steps as input and execute them
        - can AI assistant run terminal commands? 

## Detailed

Client Maks: Provide project description

- prompt: none
- input: none
- output: [[app_description_client.md]]

PO Pete: Create project description

- prompt: project_description
- input: [[app_description_client.md]]
- output: [[project_details.md]].

PO Pete: Review spec

- prompt: spec_writer/review_spec.prompt
- input: [[project_details.md]]
- output: [[project_details_reviewed.md]].
  
PO Pete: Create user stories

- prompt: [[specs.md]]
- input:
    1. app_type
    2. name
    3. project_details
    4. features_list
- output: [[user_stories.md]]

PO Pete: Create user tasks

- prompt: [[specs.md]]
- input:
    1. app_type
    2. name
    3. project_details
    4. features_list
- output: [[user_stories.md]]

Architect Anna: Create architecture

- prompt: technologies
- input:
  - [[project_description.md]]  => should be created using prompt [[project_details.prompt]]
  - [[features_list.md]]
- output: [[architecture.json]]

Tech Lead Tom: Create project_tasks

- prompt: [[prompts/prompts-gpt-pilot/components/project_tasks.prompt]]
- input:
  {{ task_type }}
- output:

Tech Lead Tom: Create development plan

- prompt:
- input:
- output

Full stack developer Frank: Implement user story

- prompt:
- input:
- output

Devops engineer Dan: Set up environment

- prompt:
- input:
- output

Code monkey Corey: Code

- prompt:
=====
- tech_lead ( break down the project into smaller tasks)
- full stack software developer (parse_task)
- take your previous message that starts with `To implement the task of` (full_stack_developer.prompt)

=====

## 1. Roles

- 'product_owner'
  - project_description
  - user_stories
    - specs
    - user_tasks
- 'architect': ['architecture'],
- 'tech_lead': ['development_planning'],
- 'full_stack_developer': ['coding'],
- 'dev_ops': ['environment_setup'],
- 'code_monkey': ['coding']

## 2. Steps

STEPS = [
    'project_description',
    'user_stories',
    'user_tasks',
    'architecture',
    'environment_setup',
    'development_planning',
    'coding',
    'finished'
]

## 3. EXAMPLE_PROJECT_DESCRIPTION

The application is a simple ToDo app built using React. Its primary function is to allow users to manage a list of tasks (todos). Each task has a description and a state (open or completed, with the default state being open). The application is frontend-only, with no user sign-up or authentication process. The goal is to provide a straightforward and user-friendly interface for task management.

Features:

1. Display of Todos: A list that displays all todo items. Each item shows its description and a checkbox to indicate its state (open or completed).
2. Add New Todo: A button to add a new todo item. Clicking this button will prompt the user to enter a description for the new todo.
3. Toggle State: Each todo item includes a checkbox. Checking/unchecking this box toggles the todo's state between open and completed.
4. Local Storage: The application will use the browser's local storage to persist todos between sessions, ensuring that users do not lose their data upon reloading the application.

Functional Specification:

- Upon loading the application, it fetches existing todos from the local storage and displays them in a list.
- Each todo item in the list displays a checkbox and a description. The checkbox reflects the todo's current state (checked for completed, unchecked for open).
- When the user checks or unchecks a checkbox, the application updates the state of the corresponding todo item and saves the updated list to local storage.
- Clicking the "Add New Todo" button prompts the user to enter a description for the new todo. Upon confirmation, the application adds the new todo (with the default state of open) to the list and updates local storage.
- The application does not support deleting or editing todo items to keep the interface and interactions simple.
- Todos persist between sessions using the browser's local storage. The application saves any changes to the todo list (additions or state changes) in local storage and retrieves this data when the application is reloaded.

Technical Specification:

- Platform/Technologies: The application is a web application developed using React. No backend technologies are required.
- Styling: Use Bootstrap 5 for a simple and functional interface. Load Boostrap from the CDN (don't install it locally):
  - <https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css>
  - <https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js>
- State Management: Directly in the React component
  - make sure to initialize the state from the local storage as default (... = useState(JSON.parse(localStorage.getItem('todos')) || []) to avoid race conditions
- Data Persistence: The application uses the browser's local storage to persist todos between sessions. It stores the array of todos as a JSON string and parses this data on application load.

## 4. EXAMPLE_PROJECT_ARCHITECTURE

    "architecture": (
        "The application is a client-side React web application that uses local storage for data persistence. "
        "It consists of a single page with components for listing todos, adding new todos, and toggling their completion status. "
        "State management is handled directly within React components, leveraging useState and useEffect hooks for state manipulation and side effects, respectively. "
        "Bootstrap 5 is used for styling to provide a responsive and accessible UI."
    ),
    "system_dependencies": [
        {
            "name": "Node.js",
            "description": "JavaScript runtime needed to run the React development tools and build the project.",
            "test": "node --version",
            "required_locally": True
        }
    ],
    "package_dependencies": [
        {
            "name": "react",
            "description": "A JavaScript library for building user interfaces."
        },
        {
            "name": "react-dom",
            "description": "Serves as the entry point to the DOM and server renderers for React."
        },
        {
            "name": "bootstrap",
            "description": "Frontend framework for developing responsive and mobile-first websites."
        }
    ],
    "template": "javascript_react"

## 5.EXAMPLE_PROJECT_PLAN

- "Create a new component TodoList: This component will display the list of todo items. "
- "Use localStorage directly to access the current state of todos and map over them, rendering each todo item as a list item. "
- "Each item should display the todo's description and a checkbox that reflects the todo's state (checked for completed, unchecked for open). "
- "When the checkbox is clicked, dispatch an action to toggle the state of the todo. "
- "Also create AddTodo: This component will include a button that, when clicked, displays a prompt asking the user for a description of the new todo. "
- "Upon confirmation, dispatch an action to add the new todo to the state with a default state of open. "
- "Ensure the component also updates the local storage with the new list of todos. "
- "Finally, use TodoList and AddTodo components in App component to implement the required functionality. "
- "Integrate Boostrap 5 for styling - add CSS/JS to index.html, style App.jsx and other files as appropriate."

## 1. Client: Create description of the app

## 2. Mark (spec writer). Creates project description


## Repettitive operations 

1. Get list of existing files in the project using tree command 
2. Attach context files in agent chat  


## Create VS Code task that will create a folder with all required files 

Create task for each repetitive development stage. For example, task breakdown. 