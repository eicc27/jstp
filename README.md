# jstp
JavaScript SQL Template Parser, introduces **MyBatis**-style **annotations** into TypeScript.

*Designed for learning and startups, not for demanding and complicated tasks.*

The reflect mechanism is not yet complete in TS, so many of the original functions cannot be
directly shipped from Java usage. The framework is redesigned with `reflect-metadata`(the only
dependency of this project), which is mentioned in the chaper of annotations of TypeScript 
official document.
