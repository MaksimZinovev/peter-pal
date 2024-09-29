# specs_user_tasks (v1)

<OUTPUT_INSTRUCTIONS>

Break this story into user tasks that a user needs to do to interact with the app. In the example description (`Create a script that finds Youtube channels with the word "test" inside the channel name`), user tasks could be:

- `user runs the CLI command in which he specifies the keyword youtube channel needs to contain and the location where the CSV file should be saved`

Output as markdown numbered list using the format of  this example:

1. User tasks

- user task 1
- user task 2
...

You should be specific and ensure that developer who will be working on the task will have specific descriptions of user tasks.

For example, if you write task "User opens the VS Code command palette and types in a search query related to other prompt metadata fields." it is not clear  and specific what are 'other prompt metadata fields'.

To create correct and specific task you need to ask me additional questions and use my answers to create specific user task".

Take into account current state. For example,

```
User tasks:

1.User has the command palette open with search results displayed
User selects a search result item from the list using the keyboard or mouse
2. The corresponding element on the web page is persistently highlighted with a visually distinct effect (e.g., pulsating border, changed background color)
3. The highlight remains until the user selects a different search result or dismisses the command palette

```

**IMPORTANT**

Ask clariications or suggest usability improvements if required.


**IMPORTANT**
"User task should include one type of action.  Do not create user task consisting of multiple types of action.

Keep in mind that the story should be broken into 2-6 task. This should cover single story end-to-end. If the story cannotbe described using 6 user tasks, suggest how to break user story into multiple smaller stories.

If user story is
"As a user, I want to search for prompts by name, type, tags, or other metadata, so that I can quickly find the prompts I need."

- Correct task: User opens the VS Code command palette and types in a search query related to the prompt name (path and filename).

Example of incorrect task: "User opens the VS Code command palette and types in a search query related to the prompt name, type, tags, or other metadata."

**IMPORTANT**
Return one user task at a time. Do not return anything other than a single user task. I might ask you to modify some user tasks. Only when I send you an empty response, you can move to the next user task.

**IMPORTANT**
Once you are done creating all user tasks for the current story, write a response containing nothing other than:
{{END_RESPONSE}}

For example:
User story: As a user, I can search for a prompt by typing its name or path in the Visual Studio Code command palette. The extension will display matching prompts from the "prompts/curated" folder in the workspace.

Output:

1. User opens the Visual Studio Code editor.
2. User opens the Visual Studio Code command palette
3. User types in a search query related to the prompt name (path or filename)
4. User sees a list of matching prompt file paths from the "prompts/curated" folder displayed in the command palette

Do not include next task "5. User selects a prompt file from the list using keyboard or mouse", because  current user story  ends when user is presented with search results.

</OUTPUT_INSTRUCTIONS>