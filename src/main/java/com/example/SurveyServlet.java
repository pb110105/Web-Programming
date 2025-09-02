package com.example;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;



// Nếu Tomcat nhận annotation:
@WebServlet("/survey")
public class SurveyServlet extends HttpServlet {
//superclass HttpServlet

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {

            // Lấy thông tin từ form
            String firstName = request.getParameter("firstName");
            String lastName = request.getParameter("lastName");
            String email = request.getParameter("email");
            String dob = request.getParameter("DoB");

            String heardFrom = request.getParameter("heardFrom");
            if (heardFrom == null) heardFrom = "Not specified";

            String wantsUpdates = request.getParameter("wantsUpdates");
            String emailOk = request.getParameter("emailOk");

            String contactVia = request.getParameter("contactVia");
            if (contactVia == null) contactVia = "Not specified";

            // Xuất HTML trả về
            out.println("<!DOCTYPE html>");
            out.println("<html><head><meta charset='UTF-8'><title>Survey Result</title></head>");
            out.println("<body style='font-family:Arial; background-color: #f0f8ff;'>");
            out.println("<h1>Survey Result</h1>");
            out.println("<p><strong>First Name:</strong> " + (firstName != null ? firstName : "") + "</p>");
            out.println("<p><strong>Last Name:</strong> " + (lastName != null ? lastName : "") + "</p>");
            out.println("<p><strong>Email:</strong> " + (email != null ? email : "") + "</p>");
            out.println("<p><strong>Date of Birth:</strong> " + (dob != null ? dob : "") + "</p>");
            out.println("<p><strong>Heard From:</strong> " + heardFrom + "</p>");
            out.println("<p><strong>Wants Updates:</strong> " + (wantsUpdates != null ? "Yes" : "No") + "</p>");
            out.println("<p><strong>Email OK:</strong> " + (emailOk != null ? "Yes" : "No") + "</p>");
            out.println("<p><strong>Preferred Contact:</strong> " + contactVia + "</p>");
            out.println("</body></html>");
        }
    }
}
