package com.oguzyildiz.ems.service.impl;

import com.oguzyildiz.ems.dto.EmployeeDto;
import com.oguzyildiz.ems.entity.Employee;
import com.oguzyildiz.ems.exception.ResourceNotFoundException;
import com.oguzyildiz.ems.repository.EmployeeRepository;
import com.oguzyildiz.ems.service.EmployeeService;
import mapper.EmployeeMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);


        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
       Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id'ye sahip kullanıcı bulunamadı: " + id));

        return EmployeeMapper.mapToEmployeeDto(employee);

    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id'ye sahip kullanıcı bulunamadı: " + id));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id'ye sahip kullanıcı bulunamadı: " + id));
        employeeRepository.delete(employee);
    }

}
