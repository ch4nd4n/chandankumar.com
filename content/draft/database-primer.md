# Database indexing

Indexing is one of the ways to squeeze performance out of databases. You have to
cook it right though. Too many indexes is a problem too, as I found it out the hard
way. Most of the point applies to RDBMS and any so called NoSQL databases.

Without indexes db engine would scan through all the rows. On small dataset it may not
be an issue, although if the number of DB calls are high, this still could bubble up
as an issue.


## Other techniques to get app performance

1. Caching
