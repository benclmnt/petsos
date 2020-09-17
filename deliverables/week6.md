# Project ER-Diagram and Constraints

This document shows the working Entity-Relationship Diagram used to design the group's application. Additional constraints are also listed below in order to accommodate some properties which cannot be represented in the diagram.

## Abbreviations
The following abbreviations will be used in this document:

 1. CT: Care Taker
 2. PO Pet Owner
 3. PCS: Pet Care System

## ER Diagram
![ER-Diagram](https://i.imgur.com/jFLF67l.jpg)

## Notes
1. The "pet category ID" attribute of capability entities refer to the "category" attribute of *Pet*.
2. The ability of a CT to cater to the special requirements of a pet is job-specific.
3. PO must register their pets in order for a job to be listed and/or taken.
4. PO's can have no pets.

## Trivial Constraints
Many trivial constraints can be inferred from the diagram or already stated in the problem definition, but the following are covered here for clarity during the development process:
1. *Pet* may have 0 or more special requirements.
2. Ratings are job-specific - PO may submit multiple reviews/ratings for a CT, limited by the number of jobs the CT has taken for that respective PO.
3. CT can take care of more than one pet at any time, but no more than 5.
4. PO may hire the same CT multiple times across different periods of time, but one *Pet* can only have one CT at a time.
5. Each *Job* has exactly 1 CT.
6. A *Pet* is owned by exactly one PO.
7. PO can have unlimited pets.
8. CT must either be full-time or part-time, and these groups are mutually exclusive.
9. Each pet is dependent on its PO. 

## Additional Constraints
Additional constraints may not be represented in the diagram, but may already be stated in the problem definition.

 1. CT should not take care of pet categories which they cannot care for under capabilities.
 2. *User* does not satisfy covering constraints since there are **at least** 3 kinds of users.
 3. *User* satisfies overlapping constraints (PO can be a CT as well, for example).
 4. Pet belongs to exactly one pet category.
 5. Availability and leaves are dependent on CT. Upon CT delete, they will be deleted as well.
 6. Full-Time CT must work for a minimum of 2 x 150 consecutive days a year.
 7. Full-Time CT cannot apply for leave for periods of time where they are taking on at least one job.
 8. Part-Time CT cannot take care of more than 2 Pets unless they have a *Good* rating: 4/5 or better. The rating is determined by the mean of their average ratings for past jobs.
 9. *PCS Admin* can specify the base daily price for Full-Time CT for each pet type.
 10. Full-Time base daily price can increase with rating.
  11. Full-Time CT is paid for *X* pet days using the formula (*X*-60) \* 0.8 \* price + 3000.
  12. Part-Time CT can specify their own price, from which PCS will earn a commission of 25%.
