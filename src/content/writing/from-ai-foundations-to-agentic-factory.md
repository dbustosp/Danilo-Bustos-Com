---
title: 'From AI Foundations to Agentic Factory: my key learnings'
description: 'How do we standardize the building, deployment, serving and operation of autonomous Agents at scale in a highly regulated industry like financial services?'
date: 2026-09-07
category: engineering
featured: true
draft: false
lang: en
origin:
  label: 'LinkedIn'
  url: 'https://www.linkedin.com/pulse/from-ai-foundations-agentic-factory-my-key-learnings-danilo-bustos-tva9f/'
---

*Disclaimer: The opinions expressed in this article are my own and do not represent the views or opinions of my employer, past or present.*

*This article has scored as 80% human written*

For the last 4 years I have been leading the next generation of Cloud AI at Equifax, adopting it in our Enterprise Analytical Platform as a core service and influencing the architecture of others critical platforms. We have also been integrating new AI capabilities to our internal tooling and processes leveraging the ~$3B investment through Equifax Cloud. The last 2 years the focus has become very ambitious and the work we have done is being driven by the following question: How do we standardize the building, deployment, serving and operation of autonomous Agents at scale in a highly regulated industry like financial services?

In this article I will highlight the learnings we as a team and I as a leader have had in this journey. During Q3 we reached an important milestone: our first autonomous agents running in Production. That milestone is the reason I am writing this article now.

## Rent the commodity, own the moat

One idea from Jamil's LinkedIn post has stuck in my mind ever since: rent what is volatile, own what encodes your judgment. It is exactly what the platform does, it is the machinery that uses cloud services (rented commodities) and converts them into products that nobody except Equifax can make (owned moats).

I love this phrase because it applies not only to the creation of multi-agent systems but also to the creation of the platform itself, for example, at the same time we can rent GitHub workflows or Google Cloud deployment services, we own the governance and security model to deploy Agents to Production (our moat).

## Make the Coding Agents part of your team

One of the reasons we were able to achieve the initial goal in a short period of time is because we understood that investing in making AI (bespoke coding agents and assistants) a first-class citizen in our SDLC process was going to pay off. We built internal AI Dev Toolkits for developers to instrument AI coding loops and code repositories; it gained a lot of traction and at the moment of writing this article it is the most popular repository internally.

We also understood that building the observability layer across repos and a common internal language in the team (human-human and human-agent) would help us to streamline the shipping. As a consequence, we are not only constantly modifying our AI instrumentation in our repo, but we are also constantly aligning on the language and writing it down to avoid confusion across humans and AIs.

## Build vs buy: work on your intuition

We all know that in the Enterprise it is very common that open source projects and cloud services can not be adopted as they are; some of the services we wanted were still in preview, not available in all the regions, or not aligned with our security posture. In our team we have developed a very important skill: the intuition for when it is worth the effort to get our hands dirty adopting it or building a particular service ourselves, versus waiting for the cloud vendor to have it in GA.

We have been inspired by many open source projects and services (ie, Google Agent Starter Pack, Superpowers, LangFuse) and we have not been afraid to build our own capabilities internally. Having the AI Architect hat takes tremendous relevancy here to design and build the features that justify the ROI and pivot later if necessary.

## Taste is a technical skill

In our team we have learned that creating an Agentic Factory (platform, tooling, process, practices) is not only an engineering exercise; it requires a product mindset to recognize what to build next and what will be the next feature asked by our Users, and it requires a data scientist mindset to make the decisions based on data and not on opinions. But we have also learned that the data and the user feedback do not answer everything; many important decisions do not have a metric or a benchmark to compare, and that is when the taste becomes very important: the judgment to decide what is worth to build and when it is good enough to ship.

In my team I try to build the taste by using the tools every day and reviewing what the Agents are doing in Production. I encourage every single team member to have customer proximity, no matter the role (ML, SRE or Manager); I also encourage dogfooding: I track the usage of the factory and every single team member must be a top user. That is how the taste is built and shared across the team, it does not stay in only one person.

## Internal FDE team: a must have

Our partnership with the Legal, Finance and HR departments, where we closely worked to create Agents (I can not disclose them), has helped us to learn that the adoption is driven by outcomes. You could have a top-notch team building the factory, but if the enterprise departments can not convert their workflows into real Agents with real value, adoption and ROI will never come. Somebody has to do the initial heavy lifting, because creating autonomous Agentic systems still requires technical skills; that is why we internally allocate time to act as a small FDE (Forward Deployed Engineering) team.

Having this time allocation makes a huge difference between a factory with capabilities and a factory with real Users and traffic.

## Governance is a design input

We work in one of the most regulated industries, so for us the governance is not a checklist at the end of the project, it decides if your Agents reach Production at all. We have learned that the best way to deal with this is to treat the governance as a design input from day one: we built it directly into the factory (identity, human approvals, evidence of every action the Agents take), so every team that builds on top of the factory inherits the compliance by default, they do not have to retrofit it at the end under pressure. The result is a streamlined process with a clean path to Production at scale.

## Be an enabler, be a multiplier, keep R&D

For the last 2 years my role has changed, moving from individual contributor to being in charge of scaling and making teams more effective. I have learned that even token-maximizing, efficient engineers quickly reach the limit of the number of activities they can accomplish by themselves; the project and the company do not scale if the lead is the bottleneck. My job now is to be an enabler and to amplify the team, not to be an individual contributor or a police officer in every piece of the factory. In practice this means paving the road so the teams can ship on top of the factory and removing the blockers before they become problems.

The multiplier part is to empower the team to make decisions. We have invested in building the taste and the common language across the team, so I can trust the decisions the team makes without me in the room; I do not need to review every design, I need to make sure the people making the decisions have the context and the judgment to make them well. That is the real multiplier: not doing more myself, making everyone around me capable of more.

One non-negotiable mindset is that we never stop R&D: we keep researching where the industry is going in terms of AI, Agentic Workflows and Infrastructure. We also have the culture of delivering internal features tagged as `@experimental` to accelerate feedback and adoption.

## Work on the distribution

Coming from a highly technical background, we are sometimes too much obsessed with the Product itself and we forget how the product reaches its users (distribution). In the Agentic era, writing cool Products and features is easier than ever before, but if you can not get people to use them, then it is not as cool as you think. Even for internal enterprise, it is critical to plan how it will reach the different departments globally.

In our team we spend a significant amount of time socializing what we build by writing technical articles and tutorials, conducting workshops, and running early adopter programs across the globe.

## Conclusion

This article tries to contribute and express several learnings in our journey building the EFX Agentic Factory. Notice this has not covered the learnings building Autonomous Agents; this has been focused on the platform. I probably missed many other learnings, but these are the ones that were on top of my mind at the moment of writing this article.
