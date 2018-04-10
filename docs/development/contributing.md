# Contributing

## Issues And Pull Requests

We use an integration between Pivotal and GitHub to keep track of progress on our work.

To utilize this integration effectively, you need to follow a process with how you structure your commit messages.

As you work on your local branch and are ready to add and commit your work you can structure your commit messages in a specific way so that when you push up your branch to GitHub and it will "start" or "finish" a ticket.

Use the following commit message structure:

```bash
git commit -m "[#PIVOTALTICKETID] The rest of your commit message here."
```

For example:

```bash
git commit -m "[#108041982] Did some awesome bug fixing."
```

The above will designate on Pivotal that the ticket has been started.

If you include a keyword like `Finishes` or `Fixes` within the brackets, then it will designate to Pivotal to "finish" the ticket story"

```bash
git commit -m "[Finishes #108041982] Fixed that darn bug."
```

You can also include more than one ticket ID in the brackets by separating them with a space:

```bash
git commit -m "[Finishes #108041982 #102281987] Fixed all the things."
```

Given the above, it is useful to make a small commit at the start of your work to designate a ticket story as "started" and for the last commit prior to peer review, use the keyword to designate a ticket story as "finished".

While the above can trigger Pivotal to "Start" and "Finish" a story ticket, you will still need to head on over to Pivotal to "Deliver" the finalized story ticket.
