---
title: "I turned a product launch into Claude skills"
description: "Launching JUMP took three days and more than a dozen sites. I packed what I learned into open-source skills that do the work and stop before anything goes public."
pubDate: 2026-10-28
cover: ./cover.webp
coverAlt: "The launch-skills icon, an orange arrow pointing up and right, next to the name launch-skills"
tags: ["Open source", "Claude Code", "AI"]
---

Building [JUMP](/en/blog/introducing-jump/) took weeks. Telling people about it took three days, and those days were all forms.

Product Hunt wants a 1270×760 gallery. Dev.to wants a 1000×420 cover, Hashnode a 1600×840 one. AlternativeTo wants the author's country. MacUpdate wants a transparent PNG of at least 512 pixels. r/macapps wants a post in a format called PCP, and only once every 30 days. Every site had its own rules, and I learned most of them by getting something wrong.

I did that launch with Claude Code driving a browser. By the end I had a document with every rule I'd hit. So the obvious next step was to turn that document into skills, so the next launch takes an afternoon instead of three days.

That's [launch-skills](https://github.com/alvaldes/launch-skills).

## What a skill is

A skill is a folder with a `SKILL.md` file: instructions an agent like Claude Code loads when your request matches its description. It can also carry scripts and reference files. You don't call it by name. You say "add my app to awesome-mac" and the right skill loads itself.

Skills are a good fit for work like this: a lot of small rules nobody remembers, a few steps that should be scripts, and judgment calls in between.

## The six skills

| Skill | What it does |
|---|---|
| `launch-kit` | Gathers the name, tagline, descriptions and comparison from your project, and generates every image size the sites ask for |
| `launch-cross-post` | Republishes your blog post on Dev.to, Hashnode and Medium, with the canonical link back to your site |
| `launch-lists` | Adds the tool to curated GitHub lists, one pull request each |
| `launch-directories` | Fills directory and newsletter forms: AlternativeTo, MacUpdate, Indie Hackers, AppAddict, iOS Dev Weekly |
| `launch-community-drafts` | Drafts posts for r/macapps, Show HN, Product Hunt and social networks, and checks them against each site's rules |
| `launch-tracker` | Keeps one table with every channel, its status and its link |

Everything for a launch lives in your project, under `docs/launch/<slug>/`: the kit, the images, the drafts and the tracker. Every other skill reads from the kit, so a fact gets written once.

## The rule that matters most: stop before publishing

Every skill stops before the last click. It fills the form, saves the draft or prepares the pull request, shows you what's in it, and asks. Signing in, solving CAPTCHAs and paying for a faster review queue are always yours.

This isn't about distrusting the agent. Everything goes out under your name, and some of it can't be undone. A pull request to someone else's repo, a post that uses up your one promotion of the month: once it's out, it's out.

## What the launch taught me

Some of the rules surprised me, so they're written into the skills:

- **New accounts can't launch.** Hacker News sends new accounts to a page that limits Show HN posts. Indie Hackers only lets established members publish. r/macapps asks for 10 karma earned inside the subreddit. The skills check the gate first, and when it's closed they say when it opens.
- **Communities can tell when AI wrote a post.** r/opensource says it outright: "All AI-generated content is low-effort and ban worthy". r/macapps warns that its filters catch em dashes. So the community skill writes drafts, not posts. Its checker flags em dashes, and every draft comes with a reminder to rewrite it in your own voice.
- **Lists close.** awesome-macOS stopped taking public submissions the day before I got to it. In the maintainers' words: "overrun by AI slop submissions which took all the joy out of doing it." Before editing anything, `launch-lists` checks that the repo still accepts public pull requests.
- **The canonical URL has to be the final one.** Cross-posts only credit your blog if the canonical link points at the address that actually answers, not at one that redirects. The skill checks it with `curl` before anything else.

That third one stuck with me. A skill that spams lists faster is the last thing those lists need. These skills do the tedious part so you can put your time into the part that's yours.

## How I tested them

A skill is instructions, so how do you test it? In two layers.

**The scripts have tests.** Inserting a line in alphabetical order into four READMEs, appending an entry to a 15,000-line JSON file without reformatting it, preparing an article for cross-posting: those are deterministic, so they're Python scripts with 25 unit tests. Then I ran each script on JUMP's real inputs and compared the output with what I had published by hand. They matched byte for byte.

**The skills have evals.** Claude Code runs eval cases with `claude plugin eval`: a prompt, an empty workspace, and graders that check whether the skill fired, whether a file was written, and, with a model as judge, whether the answer did the right thing. One case asks to add an app to the closed list and passes only if the agent opens no pull request and offers another list.

The first run didn't pass. Two cases failed: Bash wasn't enabled for the cases, so the draft checker never ran, and one of my grading rubrics was ambiguous. Both were mistakes in the test setup, not in the skills. The agent said plainly that it couldn't run the checker, and it didn't pretend it had. After fixing both, all 3 cases and 10 graders pass, in under a minute, for about half a dollar.

## Try them

In Claude Code:

```text
/plugin marketplace add alvaldes/launch-skills
/plugin install launch-skills@launch-skills
```

Then ask in plain words, from the project you're launching: "prepare the launch kit", "add it to awesome-mac", "draft the Show HN". They also work with other agents that read `SKILL.md` files.

The channel rules come from launching a macOS app, so that's where they're most complete. If you launch a library, a CLI or a web app, the lists and directories are different. That's the contribution I'd most like to get: [open an issue or a pull request](https://github.com/alvaldes/launch-skills) with the places that worked for you.
