Roles are defined in `const.common.ROLES`.
Each agent's role is described to the LLM by a prompt in `pilot/prompts/system_messages/{role}.prompt`

## Product Owner

`project_description`, `user_stories`, `user_tasks`

Prompts

- development_planning
  - user_stories
    - specs
    - user_tasks
  - plan (project)
    - project_details
    - feature_list (who creates ? - can be extracted from 'project_details)
  - feature_plan

Scope

- Talk to client, ask detailed questions about what client wants
- Give specifications to dev team

## Architect

`architecture`

Prompts

- architecture
  - technologies

Scope

- Scripts: Node.js, MongoDB, PeeWee ORM
- Testing: Node.js -> Jest, Python -> pytest, E2E -> Cypress **(TODO - BDD?)**
- Frontend: Bootstrap, vanilla Javascript **(TODO - TypeScript, Material/Styled, React/Vue/other?)**
- Other: cronjob, Socket.io

TODO:

- README.md
- .gitignore
- .editorconfig
- LICENSE
- CI/CD
- IaC, Dockerfile

## Tech Lead

`development_planning`

Prompts

- development_planning
  - plan (project)
  - feature_plan
  - feature_summary
  - alternative_solution
  - update_plan

Scope

- Break down the project into smaller tasks for devs.
- Specify each task as clear as possible:
  - Description
  - "Programmatic goal" which determines if the task can be marked as done.
    eg: "server needs to be able to start running on a port 3000 and accept API request
         to the URL `http://localhost:3000/ping` when it will return the status code 200"
  - "User-review goal"
    eg: "run `npm run start` and open `http://localhost:3000/ping`, see "Hello World" on the screen"

## Dev Ops

`environment_setup`

**TODO: no prompt**

`debug` functions: `run_command`, `implement_changes`

## Developer (full_stack_developer)

`create_scripts`, `coding`

Prompts

- coding, implement_changes
  - review_task
    - task
      - breakdown
      - next_step
      - step_check
      - update_task

Scope

- Implement tasks assigned by tech lead
- Modular code, TDD
- Tasks provided as "programmatic goals" **(TODO: consider BDD)**

## Code Monkey

`create_scripts`, `coding`, `implement_changes`

`implement_changes` functions: `save_files`

Prompts

- coding`
  - review_changes
  - identify_files_to_change

Scope

- Implement tasks assigned by tech lead
- Modular code, TDD



