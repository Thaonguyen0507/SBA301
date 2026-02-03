package com.example.lab4.repositories;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Collections;
import com.example.lab4.pojos.Employee;
import org.springframework.stereotype.Repository;

@Repository
public class EmployeeRepository implements IEmployeeRepository {
    private List<Employee> employees = createList();

    private static List<Employee> createList() {
        List<Employee> temp = new ArrayList<>();
        Collections.addAll(temp,
        new Employee("001", "Thao Nguyen", "CEO", 1200),
        new Employee("002", "Dam Vinh Hung", "hat hay", 2300),
        new Employee("003", "HieuThuHai", "cool", 3400),
        new Employee("004", "OnlyC", "tired", 4500),
        new Employee("005", "TaylorSwift", "rac mec", 5600),
        new Employee("006", "Gojo", "rak mech", 6700)
        );
        return temp;
    }

    public List<Employee> getAllEmployees() {
        return employees;
    }

    public Employee getEmployeeById(String empId) {
        Employee tmpEmployee = null;

        for (Employee emp : employees) {
            if (emp.getEmpId().equals(empId)) {
                tmpEmployee = emp;
                break;
            }
        }

        return tmpEmployee;
    }

    public Employee delete(int id) {
        Employee deletedEmp = null;

        for (Employee emp : employees) {
            if (emp.getEmpId().equals(id)) {
                employees.remove(emp);
                deletedEmp = emp;
                break;
            }
        }

        return deletedEmp;
    }

    public Employee create(Employee user) {
        employees.add(user);
        System.out.println(employees);
        return user;
    }

    public List<Employee> findAll(Sort sort) {
        return employees;
    }

    public Page<Employee> findAll(Pageable pageable) {
        List<Employee> allEmployees = createList();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), allEmployees.size());

        List<Employee> pageContent = allEmployees.subList(start, end);

        return new PageImpl<>(pageContent, pageable, allEmployees.size());
    }
}
