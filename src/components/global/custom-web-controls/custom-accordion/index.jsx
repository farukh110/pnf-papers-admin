import { Accordion, AccordionTab } from 'primereact/accordion';

const CustomAccordion = ({ tabs }) => {
    return (
        <div className="card">
            <Accordion activeIndex={0}>
                {tabs.map((tab, index) => (
                    <AccordionTab key={index} header={tab.header}>
                        <p className="m-0">{tab.content}</p>
                    </AccordionTab>
                ))}
            </Accordion>
        </div>
    );
};

export default CustomAccordion;