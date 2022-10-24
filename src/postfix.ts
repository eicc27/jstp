interface LimitPostfix {
    limit: (limit: number, offset?: number) => LimitSelection;
}

interface GroupByPostfix {
    groupBy: (columns: string[]) => GroupBySelection;
}

interface HavingPostfix {
    having: (where: string) => HavingSelection;
}

interface OrderByPostfix {
    orderBy: (columns: string[], direction: 'asc' | 'desc') => OrderBySelection;
}

class BaseSelectionPostfix {
    protected postfix: string[] = [];
    protected constructor(postfix?: string[]) { this.postfix = postfix; }
    public end() {
        return this.postfix.join(' ');
    }
}

export class SelectionPostfix {
    public static limit(limit: number, offset?: number) {
        let postfix: string[] = [];
        if (offset)
            postfix.push(`limit ${limit} offset ${offset}`);
        else
            postfix.push(`limit ${limit}`);
        return new LimitSelection(postfix);
    }

    public static orderBy(columns: string[], direction: "asc" | "desc") {
        let postfix: string[] = [];
        postfix.push(`order by ${columns.join(',')} ${direction}`);
        return new OrderBySelection(postfix);
    }

    public static groupBy(columns: string[]) {
        let postfix: string[] = [];
        postfix.push(`group by ${columns}`);
        return new GroupBySelection(postfix);
    }

    public static having(where: string) {
        let postfix: string[] = [];
        postfix.push(`having ${where}`);
        return new HavingSelection(postfix);
    }
}

class LimitSelection extends BaseSelectionPostfix {
    public constructor(postfix?: string[]) { super(postfix); }
}

class OrderBySelection extends BaseSelectionPostfix implements LimitPostfix {
    public constructor(postfix?: string[]) { super(postfix); }

    public limit(limit: number, offset?: number) {
        if (offset)
            this.postfix.push(`limit ${limit} offset ${offset}`);
        else
            this.postfix.push(`limit ${limit}`);
        return new LimitSelection(this.postfix);
    }
}

class HavingSelection extends BaseSelectionPostfix
    implements OrderByPostfix, LimitPostfix {
    public constructor(postfix?: string[]) { super(postfix); }

    public limit(limit: number, offset?: number) {
        if (offset)
            this.postfix.push(`limit ${limit} offset ${offset}`);
        else
            this.postfix.push(`limit ${limit}`);
        return new LimitSelection(this.postfix);
    }

    public orderBy(columns: string[], direction: "asc" | "desc") {
        this.postfix.push(`order by ${columns.join(',')} ${direction}`);
        return new OrderBySelection(this.postfix);
    }
}

class GroupBySelection extends BaseSelectionPostfix
    implements HavingPostfix, OrderByPostfix, LimitPostfix {
    public constructor(postfix?: string[]) { super(postfix); }

    public limit(limit: number, offset?: number) {
        if (offset)
            this.postfix.push(`limit ${limit} offset ${offset}`);
        else
            this.postfix.push(`limit ${limit}`);
        return new LimitSelection(this.postfix);
    }

    public orderBy(columns: string[], direction: "asc" | "desc") {
        this.postfix.push(`order by ${columns.join(',')} ${direction}`);
        return new OrderBySelection(this.postfix);
    }

    public having(where: string) {
        this.postfix.push(`having ${where}`);
        return new HavingSelection(this.postfix);
    }
}