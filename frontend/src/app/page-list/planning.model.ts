class Planning {
    constructor(
        public id: string,
        public situation: string,
        public description: string,
        public priority: string,
        public responsible: string,
        public runtime: string,
        public startExecution: Date,
        public status: string,
        public relationWork: string,
        public vehicle: string,
        public operationWeekend: string,
        public scheduleTomorrow: string
    ) { }
}

export { Planning }
