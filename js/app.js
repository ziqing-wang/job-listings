import * as model from './model.js';
import jobView from './views/jobView.js';
import filterView from './views/filterView.js';

const controlJobListings = async function () {
    const data = await model.loadJobs();
    jobView.render(data);
}



const controlClearFilters = () => {
    model.state.filters = [];
    model.state.filtered = model.state.jobs;
    jobView.render(model.state.jobs);
}

const controlFilter = (filterValue) => {
    if (!filterValue || model.state.filters.includes(filterValue)) return;
    // Update the filters
    model.state.filters.push(filterValue);

    if (model.state.filtered === undefined) model.state.filtered = model.state.jobs;

    // Filter the jobs
    model.state.filtered = model.state.filtered.filter(el => el.tags.includes(filterValue));;
    // Render filters container
    filterView.render(model.state.filters);

    // Render filtered jobs
    jobView.render(model.state.filtered);
}


const controlRemoveFilter = (tag) => {
    if (!tag) return;
    model.state.filters.pop(tag);
    const filters = model.state.filters;
 
    if (filters.length === 0) controlClearFilters();

    const [filteredJobs] = filters.map(fl => model.state.jobs.filter(job => job.tags.includes(fl)))

    model.state.filtered = filteredJobs;
    // Render filters container
    filterView.render(model.state.filters);

    // Render filtered jobs
    jobView.render(model.state.filtered);
}

const init = () => {
    controlJobListings();
    jobView.addHandlerClick(controlFilter);
    filterView.addHandlerRemoveFilter(controlRemoveFilter);
    filterView.addHandlerClear(controlClearFilters);
}
init();
